import { type LocationWithWeather } from '@/types/LocationWithWeather'
import { fetchLocationWeather } from './fetchLocationWeather'

export const updateLocationWeathers = async (oldLocations: LocationWithWeather[]) => {
  const updatedLocations = await Promise.all(
    oldLocations.map(async (location) => {
      try {
        const updatedTemperature = await fetchLocationWeather(location.lat, location.lon)
        return {
          ...location,
          temperature: updatedTemperature
        }
      } catch (_) {
        console.log(`Could not update ${location.label}`)
      }

      // If update fails, just return the old location...
      return location
    })
  )

  return updatedLocations
}
