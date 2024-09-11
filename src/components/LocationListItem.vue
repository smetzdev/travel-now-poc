<script lang="ts" setup>
import { HiTrash, HiMapPin } from '@kalimahapps/vue-icons'

defineProps<{
  label: String
  temperature: number
  index: number
}>()

defineEmits(['removeLocation', 'setCurrentLocation'])
</script>

<template>
  <li class="flex items-center py-4 transition-colors divide-x divide-primary-150 items-center">
    <div class="flex justify-between items-center flex-1">
      <span>{{ label }}</span>
      <span class="ml-auto pr-2 text-gray-700 text-2xl md:text-3xl font-thin font-mono">
        {{ temperature.toFixed(0) }}°
      </span>
    </div>
    <div class="flex items-center">
      <!-- Row UI -->
      <div class="pl-2 flex gap-2">
        <button @click="$emit('removeLocation', index)" title="Remove Location">
          <span class="sr-only">Remove Location</span>
          <HiTrash class="hover:text-red-500 text-gray-400" />
        </button>
        <button @click="$emit('setCurrentLocation', index)" title="Show on Map">
          <span class="sr-only">Show on Map</span>
          <HiMapPin class="hover:text-primary-500 text-gray-400" />
        </button>
      </div>
    </div>
  </li>
</template>
