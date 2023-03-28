<template>
  <Page :is-loading="arePostersLoading">
    <ProductConstructor
      :options="posterOptions"
      :isExclusion="isExclusion"
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
const isExclusion = ref(false);
const { isPostersLoadingError, arePostersLoading, posters } = storeToRefs(productStore);

const posterOptions = computed(() => posters.value?.options || []);

function validateSelection(options: any[]) {
  const isPossibleExclusion = posters.value?.checkForExclusions(options);

  isExclusion.value = isPossibleExclusion || false;
}

onMounted(async () => {
  await productStore.getPosters();
});
</script>
