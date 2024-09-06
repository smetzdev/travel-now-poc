<script lang="ts" setup>
import LocationListItem from './LocationListItem.vue'
import { type LocationWithWeather } from '@/types/LocationWithWeather'

defineProps<{
  locations: LocationWithWeather[]
}>()
</script>

<template>
  <ul class="divide-y" v-auto-animate>
    <LocationListItem
      :key="location.label"
      v-for="location in locations"
      :label="location.label"
      :temperature="location.temperature"
    />
  </ul>
</template>
