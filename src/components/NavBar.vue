<script lang="ts">
import { ref, provide } from 'vue'
export default {
    setup(_props: any, {slots}) {
        const slotsRef = slots !== undefined && slots.default !== undefined 
                                    ? slots.default() : [];
        const tabTitles = ref((slotsRef)?.map((navItem: any) => navItem.props.title));
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle);
        return {
            selectedTitle,
            tabTitles
        }
    }
}
</script>

<template>
    <nav class="nav-body">
        <a v-for="title in tabTitles"
            class="nav-item" @click="selectedTitle = title"
            :class="{ active: selectedTitle == title }">
            {{ title }}
        </a>
    </nav>
    <div><slot></slot></div>
</template>

<style scoped>
.nav-body {
    align-items: center;
    display: flex;
    list-style: none;
    border-bottom: 1px solid #213547;
}
.nav-item.active:after {
    bottom: calc(50% - 22px);
    content: "";
    height: 2px;
    position: absolute;
    right: 50%;
    transform: translate(50%, -50%);
    width: 100%;
    z-index: 1;
    border-bottom: 2px solid #646cff;
}

.nav-item {
    align-items: center;
    background-color: initial;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    font-size: 0.875rem;
    line-height: 30px;
    padding: 0 0.5rem;
    position: relative;
    text-align: center;
    white-space: nowrap;
    margin-left: 5px;
    margin-bottom: 5px;
    color: rgba(255, 255, 255);
}
.nav-item:hover {
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
}
</style>