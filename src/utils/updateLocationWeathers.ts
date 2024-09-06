import { type LocationWithWeather } from '@/types/LocationWithWeather'
import { fetchLocationWeather } from './fetchLocationWeather'

export const updateLocationWeathers = async (oldLocations: LocationWithWeather[]) => {
  const updatedLocations = await Promise.all(
    oldLocations.map(async (location) => {
      const updatedTemperature = await fetchLocationWeather(location.lat, location.lon)
      return {
        ...location,
        temperature: updatedTemperature
      }
    })
  )

  return updatedLocations
}
