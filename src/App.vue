<script setup lang="ts">
import { reactive } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import LocationList from '@/components/LocationList.vue'
import { type LocationWithWeather } from './types/LocationWithWeather'
import { fetchLocation } from './utils/fetchLocation'
import { fetchLocationWeather } from './utils/fetchLocationWeather'

const locations = reactive<LocationWithWeather[]>([
  {
    lat: 49.235,
    lon: 7.01,
    label: 'Saarbrücken, DE',
    temperature: 20
  }
])

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
    console.log(error)
  }
}

const removeLocation = (index: number) => {
  const confirmed = window.confirm('Are you sure?')

  if (confirmed) {
    locations.splice(index, 1)
  }
}
</script>

<template>
  <main class="flex justify-center items-center min-h-svh p-8 text-lg">
    <h1 class="sr-only">Travel Now POC</h1>
    <div class="w-full md:w-2/3 xl:w-2/5 flex flex-col gap-4">
      <SearchBar :addLocation="addLocation" />
      <LocationList :locations="locations" :removeLocation="removeLocation" />
    </div>
  </main>
</template>
