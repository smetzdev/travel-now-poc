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

  /**
   * Fetches the location and weather of a place by search string
   * and adds it to the locations array on success
   * Alerts the user if any issues occur
   *
   * @param searchString zip code and/or cityname
   * @returns
   */
  const addLocation = async (searchString: string) => {
    try {
      const locationData = await fetchLocation(searchString)
      const locationWeather = await fetchLocationWeather(locationData.lat, locationData.lon)

      locations.push({
        ...locationData,
        temperature: locationWeather
      })

      const newLocationIndex = locations.length - 1
      setCurrentLocation(newLocationIndex)
    } catch (error) {
      alert('Could not create location.')
      console.error(error)
      return false
    }

    return true
  }

  /**
   * Removes a location from the locations array by index
   * after the user confirms the action
   *
   * @param index of the location in the locations array
   */
  const removeLocation = (index: number) => {
    const confirmed = window.confirm('Are you sure?')

    if (confirmed) {
      locations.splice(index, 1)
    }
  }

  /**
   * Sets the currentLocation ref by index
   * with a copy of that given location
   *
   * @param index of the location in the locations array
   */
  const setCurrentLocation = (index: number) => {
    const newLocation = locations[index]
    if (newLocation)
      // complete new object here, not a reference, to break nothing when the location gets deleted
      currentLocation.value = {
        ...newLocation
      }
  }

  /**
   * Loads and parses locations from the local storage,
   * then it updates the weather for every location
   * and sets that result as the locations array
   */
  onMounted(async () => {
    const storedLocations = localStorage.getItem(STORAGE_KEY)
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations)
      const updatedLocations = await updateLocationWeathers(parsedLocations)
      locations.push(...updatedLocations)
      setCurrentLocation(0)
    }
  })

  // Update local-storage when locations change
  watch(locations, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
  })

  return {
    currentLocation,
    setCurrentLocation,
    locations,
    addLocation,
    removeLocation
  }
}
