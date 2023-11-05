<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useWeb5Service } from '../hooks/useWeb5Service';
import { usePersonService } from '../hooks/usePersonService';
import { PersonService } from '../hooks/services/person.service';
import { Person, WithContext } from "schema-dts";

const feedback = ref('')

const submitForm = async () => {
    console.log(person);
    await personService.update(person);
    feedback.value = 'Success'
}

const personRef = ref()
let personService: PersonService, 
    person: WithContext<Person>;

onBeforeMount(async () => {
    const { service } = await useWeb5Service();
    personService = await usePersonService(service);
    person = await personService.fetch();
    personRef.value = person;
})
</script>

<template>
  <div><h2>User Profile</h2></div>
  <p>{{ feedback }}</p>
  <form class="person-form" v-if="personRef" @submit.prevent="submitForm">
      <div><input id="firstname" 
        class="editfield" v-model="personRef.name" 
        type="text" placeholder="Name" /></div>
      <div><input id="familyname"
        class="editfield" v-model="personRef.familyName"
        type="text" placeholder="FamilyName" /></div>
      <div><button type="submit">Submit</button></div>
  </form>
</template>

<style scoped>
.person-form {
    width: 80vw;
}
.read-the-docs {
  color: #888;
}
*, *:before, *:after {
  box-sizing: border-box;
}
*:focus {outline:none !important}
.editfield {
    width: 250px;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #333;
    border-radius: 3px;
}
.editfield:focus {
    border-bottom: 2px solid #646cff;
}
</style>