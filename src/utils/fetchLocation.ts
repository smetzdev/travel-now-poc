/**
 *
 * @param citySearchString zip and/or city name
 */
export const fetchLocation = async (citySearchString: string) => {
  const apiUri = new URL('https://api.mapbox.com/search/geocode/v6/forward')

  apiUri.searchParams.append('access_token', import.meta.env.VITE_MAPBOX_API_KEY)
  apiUri.searchParams.append('q', citySearchString)

  const apiResponse = await fetch(apiUri.toString())

  const data: geocodeApiRespone = await apiResponse.json()

  const location = data.features[0].properties
  const coordinates = location.coordinates
  const context = location.context

  return {
    lat: coordinates.latitude,
    lon: coordinates.longitude,
    label: `${context.place.name}, ${context.country.country_code}` // Saarbrücken, DE
  }
}

type geocodeApiRespone = {
  features: {
    properties: {
      coordinates: {
        longitude: number
        latitude: number
      }
      context: {
        place: {
          name: string
        }
        country: {
          country_code: string
        }
      }
    }
  }[]
}
