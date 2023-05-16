<template>
  <div :class="style.spinner" />
</template>

<style lang="scss" module="style">
@use '../scss/colors';

.spinner {
  background: radial-gradient(farthest-side, colors.$loader 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, colors.$loader);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;

  width: 50px;
  height: 50px;

  border-radius: 50%;
}

@keyframes s3 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
