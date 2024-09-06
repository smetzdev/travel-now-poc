<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  addLocation: (searchString: string) => void
}>()

const searchString = ref('')

const submit = (e: Event) => {
  e.preventDefault()
  if (!searchString.value) return // you could hit enter and the form submits...

  props.addLocation(searchString.value)

  searchString.value = ''
}
</script>

<template>
  <form class="flex shadow-sm" @submit="submit">
    <input
      class="flex-1 border-0 rounded-l-md py-4 bg-white"
      type="text"
      placeholder="Enter ZIP and/or city..."
      v-model="searchString"
      @keydown.enter="submit"
      required
    />
    <button
      class="px-4 py-2 bg-primary-500 text-primary-50 rounded-r-md hover:bg-primary-600 transition-colors active:bg-primary-700"
    >
      Add Location
    </button>
  </form>
</template>
