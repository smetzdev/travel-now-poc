// composables/useLocations.ts

import { onMounted, reactive, watch, ref } from 'vue'
import { type LocationWithWeather } from '@/types/LocationWithWeather'
import { fetchLocation } from '@/utils/fetchLocation'
import { fetchLocationWeather } from '@/utils/fetchLocationWeather'
import { updateLocationWeathers } from '@/utils/updateLocationWeathers'

export function useLocations() {
  const STORAGE_KEY = 'travel-now-locations'
  const locations = reactive<LocationWithWeather[]>([])
  const currentLocation = ref<LocationWithWeather>()

  const addLocation = async (searchString: string) => {
    try {
      const locationData = await fetchLocation(searchString)
      const locationWeather = await fetchLocationWeather(locationData.lat, locationData.lon)

      locations.push({
        ...locationData,
        temperature: locationWeather
      })

      const newLocationIndex = locations.length - 1
      setCurrentCurrentLocation(newLocationIndex)
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

  const setCurrentCurrentLocation = (index: number) => {
    const newLocation = locations[index]
    if (newLocation)
      // complete new object here, not a reference, to break nothing when the location gets deleted
      currentLocation.value = {
        ...newLocation
      }
  }

  onMounted(async () => {
    const storedLocations = localStorage.getItem(STORAGE_KEY)
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations)
      const updatedLocations = await updateLocationWeathers(parsedLocations)
      locations.push(...updatedLocations)
      setCurrentCurrentLocation(0)
    }
  })

  watch(locations, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
  })

  return {
    currentLocation,
    setCurrentCurrentLocation,
    locations,
    addLocation,
    removeLocation
  }
}
