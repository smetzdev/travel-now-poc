<script setup lang="ts">
const submit = (e: Event) => {
  e.preventDefault()
  console.log('Submit')
  console.log(import.meta.env.VITE_WEATHER_API_KEY)
}
</script>

<template>
  <form class="flex shadow-sm" @submit="submit">
    <input
      class="flex-1 border-0 rounded-l-md py-4 bg-white"
      type="text"
      placeholder="Enter ZIP and/or city..."
      @keydown.enter="submit"
    />
    <button
      class="px-4 py-2 bg-primary-500 text-primary-50 rounded-r-md hover:bg-primary-600 transition-colors active:bg-primary-700"
    >
      Add Location
    </button>
  </form>
</template>
