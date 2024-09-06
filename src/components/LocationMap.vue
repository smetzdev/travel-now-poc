<script lang="ts" setup>
import { onMounted, useTemplateRef, ref, onUnmounted, watch } from 'vue'
import mapboxgl, { type LngLatLike } from 'mapbox-gl'
import type { LocationWithWeather } from '@/types/LocationWithWeather'

const props = defineProps<{
  currentLocation: LocationWithWeather
}>()

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const mapRef = useTemplateRef('mapContainer')
const map = ref<mapboxgl.Map>()
const marker = ref<mapboxgl.Marker>()

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapRef.value!,
    style: 'mapbox://styles/smetzdev/club3tuf800xb01pr0ms1fnvb',
    center: [6.996115, 49.227313],
    zoom: 9
  })

  updateMarker()
})

const updateMarker = () => {
  const center: LngLatLike = [props.currentLocation.lon, props.currentLocation.lat]

  marker.value = new mapboxgl.Marker().setLngLat(center).addTo(map.value!)

  map.value!.flyTo({
    center: center
  })
}

watch(() => props.currentLocation, updateMarker)

onUnmounted(() => {
  map.value?.remove()
  marker.value?.remove()
})
</script>

<template>
  <div class="flex relative aspect-video rounded-md overflow-hidden">
    <div ref="mapContainer" class="flex-1"></div>
  </div>
</template>
