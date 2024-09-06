<script lang="ts" setup>
defineProps<{
  locationName: String
  temperature: number
}>()
</script>

<template>
  <li
    class="flex justify-between py-4 px-4 hover:bg-primary-50 transition-colors divide-primary-150"
  >
    <span>{{ locationName }}</span>
    <span class="text-gray-500">{{ temperature }}°C</span>
  </li>
</template>
