<script lang="ts" setup>
import LocationListItem from './LocationListItem.vue'
import { type LocationWithWeather } from '@/types/LocationWithWeather'

defineProps<{
  locations: LocationWithWeather[]
  removeLocation: (index: number) => void
  setCurrentLocation: (index: number) => void
}>()
</script>

<template>
  <ul class="divide-y" v-auto-animate>
    <LocationListItem
      :key="location.label"
      v-for="(location, index) in locations"
      :label="location.label"
      :temperature="location.temperature"
      :remove-location="() => removeLocation(index)"
      :set-current-location="() => setCurrentLocation(index)"
    />
  </ul>
</template>
