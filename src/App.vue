<script setup>
import SearchBar from '@/components/SearchBar.vue'
import LocationList from '@/components/LocationList.vue'
</script>

<template>
  <main class="flex justify-center items-center min-h-svh p-8 text-lg">
    <h1 class="sr-only">Travel Now POC</h1>
    <div class="w-full md:w-2/3 xl:w-2/5 flex flex-col gap-4">
      <SearchBar />
      <LocationList />
    </div>
  </main>
</template>
