<template>
  <div
    :class="style.container"
    class="d-flex justify-center align-center w-50 h-100"
  >
    <h2 :class="style.text">
      NO DATA
    </h2>
  </div>
</template>
 
<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/tokens';
  
.container {
  background: colors.$blue-gradient;
  border-radius: 5px;
}

.text {
  font-family: fonts.$main-font;
  font-size: tokens.$font-size-default;
  color: colors.$white;
}
</style>
  