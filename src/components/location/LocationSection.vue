<template>
    <p v-if="!locationGranted">{{ status }}</p>
    <div v-if="locationGranted">
        <div id="mapContainer"></div>
    </div>
    <div>
      <CreateMessage @send="submit"></CreateMessage>
    </div>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ref } from 'vue'
import CreateMessage from './CreateMessage.vue';

// const store = useLocationStore()
const status = ref('wait')
const locationGranted = ref(false)
const handleLocationPermission = (result: PermissionStatus) => {
  if (result.state === 'prompt') {
    status.value = 'Give us your premission to get your location.'
  } else if (result.state === 'granted') {
    locationGranted.value = true
  } else if (result.state === 'denied') {
    status.value = 'We can not do anything for you'
  }
}
navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
  handleLocationPermission(result)
})

navigator.geolocation.getCurrentPosition(
  function (result) {
    /* ... */
    console.log(result)
    // store
    //  .setCoordinates(result.coords)
    //  .then(() => storeLocationName.retrieveNames())
    locationGranted.value = true
    const map = L.map('mapContainer').setView(
      [result.coords.latitude, result.coords.longitude],
      18
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  },
  (e) => console.warn('error happened with geolocation', e),
  { enableHighAccuracy: true }
)

navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
  handleLocationPermission(result)
})

navigator.permissions
  .query({ name: 'push' })
  .then(function (_result: PermissionStatus) {
    /* ... */
  })

const submit = (value: string) => {
  console.log(value);
}
</script>

<style scoped>
#mapContainer {
  width: 80vw;
  height: 175px;
  margin-bottom: 15px;
}
.content-msg {
  margin: 15px 0;
}
.content-item {
  margin: 5px 0;
}
</style>
