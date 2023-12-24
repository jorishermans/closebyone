<template>
    <div class="content-msg">
        <div class="content-msg-top">
        <div class="author">{{ message.sender.name }} {{ message.sender.familyName }}</div>
        <div class="date">{{ formatDate(message.datePublished) }}</div>
      </div>
      <div>{{ message.text }}</div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';

defineProps(['message'])
const formatDate = (dateString: string) => {
  const date = dayjs(dateString);
  // Then specify how you want your dates to be formatted
  return date.format('dddd MMMM D, YYYY - HH:mm');
}
</script>

<style lang="scss" scoped>
#mapContainer {
  width: 80vw;
  height: 175px;
  margin-bottom: 15px;
}
.content-msg {
  margin: 15px 0;
  .content-msg-top {
    font-size: 0.7rem;
    display: flex;
    div {
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-content: space-between;
    }
  }
}
.content-item {
  margin: 5px 0;
}
</style>