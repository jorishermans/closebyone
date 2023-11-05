<script setup lang="ts">
import { ref } from "vue";
import PersonForm from "./components/PersonForm.vue";
import NavBar from "./components/core/NavBar.vue";
import NavItem from "./components/core/NavItem.vue";
import { useWeb5Service } from "./hooks/useWeb5Service";

const did = ref<string | null>(null);
const loading = ref<boolean>(false);

const login = async () => {
  loading.value = true;
  const { did: didAlice } = await useWeb5Service();
  did.value = didAlice;
  loading.value = false;
}
</script>

<template>
  <div><h1>CloseBy1.</h1></div>
  <div v-if="did && !loading"><div class="did small">{{ did }}</div>
  <NavBar>
    <NavItem title="Locations">
      Locations
    </NavItem>
    <NavItem title="User Profile">
      <PersonForm></PersonForm>
    </NavItem>
    <NavItem title="Contacts">
      Contacts
    </NavItem>
  </NavBar>
  
  </div>
  <div v-if="!did && !loading">
    <p>A geo messaging application that takes your data seriously. <br />
      Build up with a decentralized mindset.
    </p>

    <button @click="login">login</button>
  </div>
</template>

<style scoped>
.did.small {
  font-size: 9px;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
