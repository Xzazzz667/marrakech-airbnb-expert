import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Property {
  source: string
  source_url: string
  title: string
  description: string | null
  price: string | null
  surface: string | null
  location: string | null
  property_type: string
  images: string[]
  bedrooms: number | null
  bathrooms: number | null
  amenities: string[]
}

const SOURCES = [
  {
    name: 'Mubawab',
    url: 'https://www.mubawab.ma/fr/st/marrakech/riads-a-louer',
    propertyType: 'Riad'
  },
  {
    name: 'Avito',
    url: 'https://www.avito.ma/fr/marrakech/immobilier/riad_a_louer',
    propertyType: 'Riad'
  },
  {
    name: 'Villas Marrakech',
    url: 'https://www.villasmarrakech.com/fr/collections/riads',
    propertyType: 'Riad'
  }
]

function parseProperties(markdown: string, source: string, sourceUrl: string, propertyType: string): Property[] {
  const properties: Property[] = []
  
  // Split by common listing patterns
  const listings = markdown.split(/(?=#{1,3}\s|(?:\n\n|\r\n\r\n)(?=[A-Z]|Riad|Villa|Appartement))/i)
  
  for (const listing of listings) {
    if (listing.trim().length < 50) continue
    
    // Extract title (first heading or first line)
    const titleMatch = listing.match(/^#+\s*(.+?)(?:\n|$)/m) || listing.match(/^(.{10,100})(?:\n|$)/m)
    const title = titleMatch ? titleMatch[1].trim().replace(/\*\*/g, '') : null
    
    if (!title || title.length < 5) continue
    
    // Extract price patterns
    const priceMatch = listing.match(/(\d[\d\s.,]*)\s*(?:MAD|DH|€|EUR|dirhams?)/i) ||
                       listing.match(/(?:prix|loyer|tarif)\s*:?\s*(\d[\d\s.,]*)/i) ||
                       listing.match(/(\d{3,}[\d\s.,]*)\s*(?:\/\s*(?:mois|nuit|jour))?/i)
    const price = priceMatch ? priceMatch[0].trim() : null
    
    // Extract surface patterns
    const surfaceMatch = listing.match(/(\d+)\s*(?:m²|m2|mètres?\s*carrés?)/i) ||
                         listing.match(/surface\s*:?\s*(\d+)/i)
    const surface = surfaceMatch ? `${surfaceMatch[1]} m²` : null
    
    // Extract location
    const locationMatch = listing.match(/(?:marrakech|médina|guéliz|hivernage|palmeraie|route\s+de\s+\w+)/i)
    const location = locationMatch ? locationMatch[0] : 'Marrakech'
    
    // Extract bedrooms
    const bedroomsMatch = listing.match(/(\d+)\s*(?:chambres?|ch\.|bedrooms?|suites?)/i)
    const bedrooms = bedroomsMatch ? parseInt(bedroomsMatch[1]) : null
    
    // Extract bathrooms
    const bathroomsMatch = listing.match(/(\d+)\s*(?:salles?\s*de\s*bain|sdb|bathrooms?)/i)
    const bathrooms = bathroomsMatch ? parseInt(bathroomsMatch[1]) : null
    
    // Extract images
    const imageMatches = listing.matchAll(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/g)
    const images = Array.from(imageMatches).map(m => m[1]).slice(0, 5)
    
    // Also check for raw image URLs
    const rawImageMatches = listing.matchAll(/(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|gif))/gi)
    const rawImages = Array.from(rawImageMatches).map(m => m[1])
    const allImages = [...new Set([...images, ...rawImages])].slice(0, 5)
    
    // Extract amenities
    const amenities: string[] = []
    if (/piscine/i.test(listing)) amenities.push('Piscine')
    if (/jardin/i.test(listing)) amenities.push('Jardin')
    if (/terrasse/i.test(listing)) amenities.push('Terrasse')
    if (/parking/i.test(listing)) amenities.push('Parking')
    if (/wifi|internet/i.test(listing)) amenities.push('WiFi')
    if (/climatisation|clim/i.test(listing)) amenities.push('Climatisation')
    if (/meublé/i.test(listing)) amenities.push('Meublé')
    if (/patio/i.test(listing)) amenities.push('Patio')
    if (/spa|hammam/i.test(listing)) amenities.push('Spa/Hammam')
    
    // Clean description (first 500 chars without special formatting)
    const description = listing
      .replace(/^#+\s*.+?\n/gm, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/\*\*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      .slice(0, 500)
    
    properties.push({
      source,
      source_url: sourceUrl,
      title: title.slice(0, 200),
      description: description || null,
      price,
      surface,
      location,
      property_type: propertyType,
      images: allImages,
      bedrooms,
      bathrooms,
      amenities
    })
  }
  
  return properties.slice(0, 10) // Return max 10 per source
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured')
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Starting property scraping...')
    
    const allProperties: Property[] = []
    const errors: string[] = []

    for (const source of SOURCES) {
      console.log(`Scraping ${source.name}: ${source.url}`)
      
      try {
        const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${firecrawlApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: source.url,
            formats: ['markdown', 'links'],
            onlyMainContent: true,
            waitFor: 3000,
          }),
        })

        const data = await response.json()
        
        if (!response.ok || !data.success) {
          console.error(`Error scraping ${source.name}:`, data)
          errors.push(`${source.name}: ${data.error || 'Unknown error'}`)
          continue
        }

        const markdown = data.data?.markdown || data.markdown || ''
        console.log(`Got ${markdown.length} chars from ${source.name}`)
        
        const properties = parseProperties(markdown, source.name, source.url, source.propertyType)
        console.log(`Parsed ${properties.length} properties from ${source.name}`)
        
        allProperties.push(...properties)
        
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error)
        errors.push(`${source.name}: ${error.message}`)
      }
    }

    console.log(`Total properties scraped: ${allProperties.length}`)

    // Insert properties into database
    if (allProperties.length > 0) {
      const { data: insertedData, error: insertError } = await supabase
        .from('properties')
        .insert(allProperties)
        .select()

      if (insertError) {
        console.error('Error inserting properties:', insertError)
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Database error: ${insertError.message}`,
            scraped: allProperties.length 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log(`Inserted ${insertedData?.length || 0} properties`)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          inserted: insertedData?.length || 0,
          properties: insertedData,
          errors: errors.length > 0 ? errors : undefined
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'No properties found',
        errors 
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
