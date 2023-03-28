<template>
  <div class="page-wrapper">
    <Loader v-if="isLoading"/>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue";

defineProps({
  isLoading: {
    type: Boolean
  }
});
</script>

<style lang="scss">
.page-wrapper {
  padding: 12px;
}
</style>
