<template>
    <div>
      <div>
        <textarea
          v-model="value"
          type="textarea"
          :passively-activated="true"
          placeholder="Message or note for this location"
          maxlength="120"
          show-count
        ></textarea>
        <!--ChooseLocationToSendDialog
          v-model:show="showLocationBox"
          @add="sendLocation"
        ></ChooseLocationToSendDialog-->
        <div class="actions">
          <button @click="send" >Send</button>
          <!--button @click="showLocationBox = true">Send to location</button-->
        </div>
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
 
  const value = ref<string>('')
  
  // const showLocationBox = ref(false)
  
  const emit = defineEmits(['send'])
  
  const send = () => {
    // add project with name
    emit('send', value.value)
    value.value = ''
  }
  /** const sendLocation = (locationHash: string) => {
    emit('send', value.value, locationHash)
  } */
  </script>

  <style>
    textarea {
        width: 100%;
        min-height: 75px;
        border-radius: 2px;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px #999;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
    }
    textarea:focus {outline:none !important}
    .actions {
        display:flex;
        justify-content: flex-end;
    }
  </style>