import os
import requests
import xml.etree.ElementTree as ET
from supabase import create_client, Client

# 1. Connect to your Supabase Database
# These variables will pull from your secure cloud hosting dashboard settings
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials in environment variables.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Core Matrimonial Legal Keywords to filter out noise
KEYWORDS = ["divorce", "498a", "bns", "bnss", "maintenance", "alimony", "custody", "marriage", "ipc", "crpc", "dowry", "cruelty", "visitation", "family court"]

def clean_and_categorize(query_text):
    """Categorizes the text query into our app's dashboard tabs."""
    text_lower = query_text.lower()
    if "498a" in text_lower or "85" in text_lower or "cruelty" in text_lower or "dowry" in text_lower:
        return "498A & BNS 85"
    elif "maintenance" in text_lower or "alimony" in text_lower or "salary" in text_lower or "125" in text_lower:
        return "Maintenance & Alimony"
    elif "custody" in text_lower or "child" in text_lower or "visitation" in text_lower:
        return "Child Custody"
    elif "nri" in text_lower or "passport" in text_lower or "overseas" in text_lower:
        return "NRI Marriages"
    else:
        return "Mutual & Contested Divorce"

def push_to_supabase(query_text, category, source):
    """Inserts or updates the trend row inside Supabase."""
    try:
        data = {
            "query_text": query_text,
            "category": category,
            "baseline_volume": 1200, # Base proxy traffic metric
            "trend_percentage": 150,  # Rising metric marker
            "region": "India National",
            "status_badge": "Recent Spike",
            "source_platform": source
        }
        # Upsert logic checks if query exists, else creates new row
        supabase.table("matrimonial_trends").upsert(data).execute()
        print(f" Successfully synced row from {source}: {query_text}")
    except Exception as e:
        print(f"Error pushing to database: {e}")

# ==========================================
# DATA SOURCE 1: GOOGLE TRENDS INDIA RSS FEED
# ==========================================
def fetch_google_trends():
    print("Fetching Google Trends RSS...")
    url = "https://google.com"
    response = requests.get(url)
    if response.status_code == 200:
        root = ET.fromstring(response.content)
        for item in root.findall(".//item"):
            title = item.find("title").text
            # If the trending topic contains our legal keywords, capture it!
            if any(kw in title.lower() for kw in KEYWORDS):
                cat = clean_and_categorize(title)
                push_to_supabase(title, cat, "Google Trends")

# ==========================================
# DATA SOURCE 2: REDDIT r/LegalAdviceIndia API
# ==========================================
def fetch_reddit_trends():
    print("Fetching Reddit r/LegalAdviceIndia Feeds...")
    # Pulling public search listings safely without requiring an OAuth account login
    url = "https://reddit.com"
    headers = {"User-Agent": "MatrimonialTrendTrackerBot/1.0 by Dev"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        posts = data.get("data", {}).get("children", [])
        for post in posts:
            title = post.get("data", {}).get("title", "")
            if len(title) > 10:  # Ensure it is a comprehensive query string
                cat = clean_and_categorize(title)
                # Trim long titles to keep card layout clean
                short_title = title if len(title) < 65 else title[:62] + "..."
                push_to_supabase(short_title, cat, "Reddit")

if __name__ == "__main__":
    fetch_google_trends()
    fetch_reddit_trends()
    print("Data extraction loop complete.")
