<template>
  <header :class="style.header">
    <h1>Disney character browser</h1>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" module="style">
@use "../scss/colors";
@use "../scss/fonts";
@use "../scss/media";
@use "../scss/tokens";

.header {
  background: colors.$header-gradient;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100px;

  font-family: fonts.$header-font;
  font-size: tokens.$header-font-size-desktop;
  color: colors.$white;

  @include media.mobile {
    font-size: tokens.$header-font-size-mobile;
  }
}
</style>
