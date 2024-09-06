<script lang="ts" setup>
import { HiTrash, HiMapPin } from '@kalimahapps/vue-icons'

defineProps<{
  label: String
  temperature: number
  removeLocation: () => void
  setCurrentLocation: () => void
}>()
</script>

<template>
  <li class="flex justify-between py-4 px-4 transition-colors divide-primary-150 items-center">
    <span>{{ label }}</span>
    <div class="flex items-center divide-x">
      <span class="text-gray-500 ml-auto pr-2">{{ temperature.toFixed(1) }}°C</span>
      <div class="pl-2 flex gap-2">
        <button @click="removeLocation" title="Remove Location">
          <span class="sr-only">Remove Location</span>
          <HiTrash class="hover:text-red-500 text-gray-400" />
        </button>
        <button @click="setCurrentLocation" title="Show on Map">
          <span class="sr-only">Show on Map</span>
          <HiMapPin class="hover:text-primary-500 text-gray-400" />
        </button>
      </div>
    </div>
  </li>
</template>
