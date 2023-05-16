<template>
  <v-app>
    <AppHeader />

    <HomeView />

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import HomeView from './views/HomeView.vue';
</script>

<style lang="scss" module="style">
  html {
    scroll-behavior: smooth;
  }
</style>
