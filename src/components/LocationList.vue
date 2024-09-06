<script setup>
import LocationListItem from './LocationListItem.vue'
</script>

<template>
  <ul class="divide-y">
    <LocationListItem location-name="Saarbrücken" :temperature="24" />
    <LocationListItem location-name="Bierfeld" :temperature="23" />
  </ul>
</template>
