<script lang="ts" setup>
import { onMounted, useTemplateRef, ref, onUnmounted, watch } from 'vue'
import mapboxgl, { type LngLatLike } from 'mapbox-gl'
import type { LocationWithWeather } from '@/types/LocationWithWeather'

const props = defineProps<{
  currentLocation: LocationWithWeather
  locations: LocationWithWeather[]
}>()

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const mapRef = useTemplateRef('mapContainer')
const map = ref<mapboxgl.Map>()
const currentMarker = ref<mapboxgl.Marker>()

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapRef.value!,
    style: 'mapbox://styles/smetzdev/cm0qyhnur00og01qk2mna2btr',
    center: [props.currentLocation.lon, props.currentLocation.lat],
    zoom: 9
  })

  setInitialMarkers()
})

const setMarker = (location: LocationWithWeather) => {
  const center: LngLatLike = [location.lon, location.lat]
  return new mapboxgl.Marker().setLngLat(center).addTo(map.value!)
}

const setInitialMarkers = () => {
  props.locations.forEach((location) => {
    setMarker(location)
  })
}

const flyToCurrentLocation = () => {
  currentMarker.value = setMarker(props.currentLocation)

  map.value!.flyTo({
    center: currentMarker.value.getLngLat()
  })
}

watch(() => props.currentLocation, flyToCurrentLocation)

onUnmounted(() => {
  map.value?.remove()
  currentMarker.value?.remove()
})
</script>

<template>
  <div class="flex relative aspect-video rounded-md overflow-hidden">
    <div ref="mapContainer" class="flex-1"></div>
  </div>
</template>
