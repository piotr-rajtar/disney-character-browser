<template>
  <v-app>
    <AppHeader />

    <RouterView />
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";

import AppHeader from "./components/AppHeader.vue";
</script>

<style module="style"></style>
