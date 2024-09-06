<script lang="ts" setup>
import { HiTrash } from '@kalimahapps/vue-icons'

defineProps<{
  label: String
  temperature: number
  removeLocation: () => void
}>()
</script>

<template>
  <li
    class="flex justify-between py-4 px-4 hover:bg-primary-50 transition-colors divide-primary-150 items-center"
  >
    <span>{{ label }}</span>
    <div class="flex items-center divide-x">
      <span class="text-gray-500 ml-auto pr-2">{{ temperature.toFixed(1) }}°C</span>
      <button class="pl-2" @click="removeLocation">
        <span class="sr-only">Remove Location</span>
        <HiTrash class="hover:text-red-500 text-gray-400" />
      </button>
    </div>
  </li>
</template>
