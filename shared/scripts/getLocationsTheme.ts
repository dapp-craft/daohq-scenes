import { base_url } from '../globals'

type Theme = {
  id: number
  type: string
  s3_urn: string
  order_id: number | null
  booking: number | null
  location: string
}

export async function getLocationTheme(location: string) {
  const response = await fetch(`${base_url}/music/live?locations=${location}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch themes for location ${location}`)
  }
  const themes = await response.json()
  return (themes[location] as Theme[]).map((obj) => obj.s3_urn)
}

export async function getLocationThemeBatch(locations: string[]) {
  if (locations.length == 0) return []
  if (locations.length == 1) return getLocationTheme(locations[0])
  let query = `locations=${locations[0]}`
  for (let i = 1; i < locations.length; i++) {
    query += `&locations=${locations[i]}`
  }
  const response = await fetch(`${base_url}/music/live?${query}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch themes for locations ${locations}`)
  }
  return await response.json()
}
