<template>
  <v-main>
    <v-container class="d-flex align-center justify-center">
      <v-btn :class="style.button">
        Fetch data
      </v-btn>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup></script>

<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/tokens';

.button.button {
  background: colors.$blue-gradient;

  font-family: fonts.$main-font;
  font-size: tokens.$font-size-default;
  color: colors.$white;
}
</style>
