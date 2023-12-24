<template>
    <p v-if="!locationGranted">{{ status }}</p>
    <div v-if="locationGranted">
        <div id="mapContainer"></div>
    </div>
    <div>{{ locationHash }}</div>
    <div v-if="locationHash">
      <CreateMessage @send="submit"></CreateMessage>
    </div>
    <div v-for="message of messagesRef">
      <LocationMessage :message="message"></LocationMessage>
    </div>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ref, watch } from 'vue'
import CreateMessage from './CreateMessage.vue';
import LocationMessage from './LocationMessage.vue';
import { GeoMessageService } from '../../hooks/services/geo-message.service';
import { useWeb5Service } from '../../hooks/useWeb5Service';
import { Message, Person, WithContext } from 'schema-dts';
import { useGeoMessageService } from '../../hooks/use-geo-message.service';
import { PersonService } from '../../hooks/services/person.service';
import { usePersonService } from '../../hooks/use-person.service';
import { GeoWebCoordinate } from 'js-geo-web-coordinate';

// const store = useLocationStore()
const locationHash = ref('');
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
    const _gwCoord = GeoWebCoordinate.fromGPS(
        result.coords.longitude,
        result.coords.latitude
      )
    locationHash.value = _gwCoord.toString()
    console.log(locationHash);
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

interface PushPermissions extends PushSubscriptionOptionsInit, PermissionDescriptor {}

navigator.permissions
  .query({ name: 'push', userVisibleOnly:true } as PushPermissions)
  .then(function (result: PermissionStatus) {
    /* ... */
    console.log(result);
  })

const submit = async (value: string) => {
  console.log(value);

  //
  const message = geoMessageService.createGeoMessage(locationHash.value, value, person);
  messages = await geoMessageService.create(message);
  messagesRef.value = messages;
}

const messagesRef = ref()
let geoMessageService: GeoMessageService,
    personService: PersonService,
    messages: WithContext<Message>[],
    person: WithContext<Person>;

watch(locationHash, async (newLocationHash, _locationHash) => {
    const { service } = await useWeb5Service();
    geoMessageService = await useGeoMessageService(service);
    personService = await usePersonService(service);
    messages = await geoMessageService.fetch(newLocationHash);
    person = await personService.fetch();
    messagesRef.value = messages;
    console.log(messages);
})
</script>

<style lang="scss" scoped>
#mapContainer {
  width: 80vw;
  height: 175px;
  margin-bottom: 15px;
}

.content-item {
  margin: 5px 0;
}
</style>
