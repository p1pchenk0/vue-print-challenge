<template>
  <div class="loader">
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.5);
  height: 100%;

  &__bar {
    background-color: #A3D5FF;
    width: 1rem;
    height: 1rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    animation: loader-anim 1s ease-in-out infinite;

    &:nth-of-type(2) {
      animation-delay: .33s;
    }

    &:nth-of-type(3) {
      animation-delay: .66s;
    }
  }
}

@keyframes loader-anim {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1, 2.5);
  }
  40% {
    transform: scale(1);
  }
}
</style>
