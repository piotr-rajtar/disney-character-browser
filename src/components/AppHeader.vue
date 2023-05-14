<template>
  <header :class="style.headerContainer">
    <h1 :class="style.header">Disney character browser</h1>
  </header>
</template>

<style lang="scss" module="style">
@use "../scss/colors";
@use "../scss/fonts";
@use "../scss/media";
@use "../scss/tokens";

.headerContainer {
  background: colors.$blue-gradient;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100px;
}

.header {
  font-family: fonts.$header-font;
  font-size: tokens.$header-font-size-desktop;
  color: colors.$white;

  @include media.mobile {
    font-size: tokens.$header-font-size-mobile;
  }
}
</style>
