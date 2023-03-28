<template>
  <Page :is-loading="areFlyersLoading">
    <ProductConstructor
      :options="flyerOptions"
      @validateSelection="validateSelection"
    />
  </Page>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Page from '@/components/Page.vue';
import ProductConstructor from '@/components/ProductConstructor.vue';

const productStore = useProductStore();
const { isFlyersLoadingError, areFlyersLoading, flyers } = storeToRefs(productStore);

const flyerOptions = computed(() => flyers.value?.options || []);

function validateSelection(options: any[]) {
  flyers.value?.checkForExclusions(options);
}

onMounted(async () => {
  await productStore.getFlyers();
});
</script>
