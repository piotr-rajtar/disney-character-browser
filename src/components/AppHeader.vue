<template>
  <v-app-bar>
    <div
      :class="style.headerContainer"
      class="d-flex justify-center align-center w-100 h-100"
    >
      <h1 :class="style.header">
        Disney character browser
      </h1>
    </div>
  </v-app-bar>
</template>

<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/media';
@use '../scss/tokens';

.headerContainer {
  background: colors.$blue-gradient;
}

.header {
  font-family: fonts.$main-font;
  font-size: tokens.$header-font-size-desktop;
  color: colors.$white;

  @include media.mobile {
    font-size: tokens.$header-font-size-mobile;
  }
}
</style>
