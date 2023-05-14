<template>
  <v-footer
    :app="true"
    class="px-0 py-0"
  >
    <p
      :class="style.footer"
      class="px-4 py-2 text-center w-100"
      
    >
      {{ currentYear }} — Piotr Rajtar
    </p>
  </v-footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/media';
@use '../scss/tokens';

.footer {
  background: colors.$blue-gradient;

  font-family: fonts.$main-font;
  font-size: tokens.$footer-font-size-desktop;
  color: colors.$white;

  @include media.mobile {
    font-size: tokens.$footer-font-size-mobile;
  }
}
</style>
