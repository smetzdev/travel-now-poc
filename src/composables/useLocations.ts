// composables/useLocations.ts

import { onMounted, reactive, watch } from 'vue'
import { type LocationWithWeather } from '@/types/LocationWithWeather'
import { fetchLocation } from '@/utils/fetchLocation'
import { fetchLocationWeather } from '@/utils/fetchLocationWeather'

export function useLocations() {
  const STORAGE_KEY = 'travel-now-locations'
  const locations = reactive<LocationWithWeather[]>([])

  const addLocation = async (searchString: string) => {
    try {
      const locationData = await fetchLocation(searchString)
      const locationWeather = await fetchLocationWeather(locationData.lat, locationData.lon)

      locations.push({
        ...locationData,
        temperature: locationWeather
      })
    } catch (error) {
      alert('Could not create location.')
      console.error(error)
    }
  }

  const removeLocation = (index: number) => {
    const confirmed = window.confirm('Are you sure?')

    if (confirmed) {
      locations.splice(index, 1)
    }
  }

  onMounted(() => {
    const storedLocations = localStorage.getItem(STORAGE_KEY)
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations)
      locations.push(...parsedLocations)
    }
  })

  watch(locations, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
  })

  return {
    locations,
    addLocation,
    removeLocation
  }
}
