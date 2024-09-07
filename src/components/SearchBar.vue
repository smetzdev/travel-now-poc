<script setup lang="ts">
import { ref } from 'vue'
import { CgSpinner } from '@kalimahapps/vue-icons'

const props = defineProps<{
  addLocation: (searchString: string) => Promise<boolean>
}>()

const searchString = ref('')
const isLoading = ref(false)

const submit = async (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  if (!searchString.value) return // you could hit enter and the form submits...

  const success = await props.addLocation(searchString.value)

  if (success) {
    searchString.value = ''
  }
  isLoading.value = false
}
</script>

<template>
  <form class="flex shadow-sm" @submit="submit">
    <input
      class="flex-1 border-0 rounded-l-md py-4 bg-white focus:ring-inset focus:ring-primary-500"
      type="text"
      placeholder="Enter ZIP and/or city..."
      v-model="searchString"
      @keydown.enter="submit"
      required
      name="search"
      autocomplete="off"
    />
    <button
      class="px-4 py-2 bg-primary-500 text-primary-50 rounded-r-md hover:bg-primary-600 transition-colors active:bg-primary-700 min-h-8 sm:min-w-36 disabled:grayscale"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">Add<span class="max-sm:hidden"> Location</span> </span>
      <CgSpinner v-if="isLoading" class="animate-spin mx-auto" />
    </button>
  </form>
</template>
