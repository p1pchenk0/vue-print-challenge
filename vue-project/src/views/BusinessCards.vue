<template>
  <Page :is-loading="areBusinessCardsLoading">
    <ProductConstructor
      :options="businessCardOptions"
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
const { isBusinessCardsLoadingError, areBusinessCardsLoading, businessCards } = storeToRefs(productStore);

const businessCardOptions = computed(() => businessCards.value?.options || []);

function validateSelection(options: any[]) {
  businessCards.value?.checkForExclusions(options);
}

onMounted(async () => {
  await productStore.getBusinessCards();
});
</script>
