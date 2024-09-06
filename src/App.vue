<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import LocationList from '@/components/LocationList.vue'
import LocationMap from '@/components/LocationMap.vue'
import { useLocations } from '@/composables/useLocations'

const { currentLocation, locations, addLocation, removeLocation, setCurrentCurrentLocation } =
  useLocations()
</script>

<template>
  <main class="flex justify-center items-center min-h-svh p-8 md:text-lg">
    <h1 class="sr-only">Travel Now POC</h1>
    <div class="w-full md:w-2/3 xl:w-2/5 flex flex-col gap-4">
      <LocationMap
        :current-location="currentLocation"
        :locations="locations"
        v-if="currentLocation"
      />
      <SearchBar :addLocation="addLocation" />
      <LocationList
        :locations="locations"
        :remove-location="removeLocation"
        :set-current-location="setCurrentCurrentLocation"
      />
    </div>
  </main>
</template>
