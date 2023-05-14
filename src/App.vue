<template>
  <v-app>
    <AppHeader />

    <RouterView />

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<style module="style"></style>
