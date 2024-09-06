/**
 *
 * @param citySearchString zip and/or city name
 */
export const fetchGeoCode = async (citySearchString: string) => {
  const apiUri = new URL('https://api.mapbox.com/search/geocode/v6/forward')

  apiUri.searchParams.append('access_token', import.meta.env.VITE_GEOCODE_API_KEY)
  apiUri.searchParams.append('q', citySearchString)

  const apiResponse = await fetch(apiUri.toString())

  const data: geocodeApiRespone = await apiResponse.json()

  const [lon, lat] = data.features[0].geometry.coordinates

  return {
    lat,
    lon
  }
}

type geocodeApiRespone = {
  features: {
    geometry: {
      coordinates: [number, number]
    }
  }[]
}
