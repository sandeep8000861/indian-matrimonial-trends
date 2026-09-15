import { serve } from "https://deno.land"
import { createClient } from "https://esm.sh"

serve(async (req) => {
  try {
    // 1. Establish secure internal connection to your database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Fetch the live legal RSS data stream from Shades of Knife
    const response = await fetch("https://shadesofknife.in")
    const xmlText = await response.text()

    // 3. Extract the latest post item using basic text parsing strings
    const firstItem = xmlText.split('<item>')[1]
    if (!firstItem) return new Response("No items found", { status: 200 })

    const title = firstItem.split('<title>')[1].split('</title>')[0]
    const link = firstItem.split('<link>')[1].split('</link>')[0]
    const pubDate = firstItem.split('<pubDate>')[1].split('</pubDate>')[0]

    // 4. Guard Layer: Check if this legal case link is already logged in our database
    const { data: existingRecord } = await supabase
      .from('trends') // Assumes your database table is named 'trends'
      .select('id')
      .eq('source_origin_url', link)
      .single()

    if (existingRecord) {
      return new Response("No new updates found. Database is current.", { status: 200 })
    }

    // 5. Intelligent Automated Categorization Logic
    let assignedSector = "Family Law" // Default category fallback
    let statusBadge = "Latest Update"

    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("498a") || lowerTitle.includes("cruelty")) {
      assignedSector = "IPC 498A (Cruelty)"
      statusBadge = "Criminal Revision"
    } else if (lowerTitle.includes("maintenance") || lowerTitle.includes("125")) {
      assignedSector = "Alimony & Maintenance"
      statusBadge = "Financial Order"
    } else if (lowerTitle.includes("divorce") || lowerTitle.includes("cruelty")) {
      assignedSector = "Divorce Proceedings"
      statusBadge = "Family Court Case"
    } else if (lowerTitle.includes("custody") || lowerTitle.includes("child")) {
      assignedSector = "Child Custody"
      statusBadge = "Guardianship Order"
    }

    // 6. Write the structured legal data package live to your database
    const { error: insertError } = await supabase
      .from('trends')
      .insert([
        {
          title: title,
          summary: `New update regarding matrimonial law published on Shades of Knife.`,
          sector: assignedSector,
          status_badge: statusBadge,
          source_origin_url: link,
          created_at: new Date(pubDate).toISOString()
        }
      ])

    if (insertError) throw insertError

    return new Response("Successfully processed and added new legal trend row!", { status: 200 })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
