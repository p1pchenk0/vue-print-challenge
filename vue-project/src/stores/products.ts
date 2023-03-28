import { ref, type UnwrapRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProductService } from '@/services/product.service';
import type { ProductList } from '@/business/ProductList';
import type { Maybe } from '@/shared';

export type Product = 'poster' | 'flyer' | 'business-card';

// TODO: products exposed from here to view should be simple structure, while all logic should remain inside class
export function makeProductStore(productService: IProductService) {
  return defineStore('products', () => {
    const arePostersLoading = ref(false);
    const isPostersLoadingError = ref(false);
    const posters: Ref<UnwrapRef<Maybe<ProductList>>> = ref(null);

    async function getPosters() {
      isPostersLoadingError.value = false;
      arePostersLoading.value = true;

      const [error, parsedPosters] = await productService.fetchPosters();

      arePostersLoading.value = false;
      isPostersLoadingError.value = !!error;
      posters.value = parsedPosters;
    }

    const areFlyersLoading = ref(false);
    const isFlyersLoadingError = ref(false);
    const flyers: Ref<UnwrapRef<Maybe<ProductList>>> = ref(null);

    async function getFlyers() {
      isFlyersLoadingError.value = false;
      areFlyersLoading.value = true;

      const [error, parsedFlyers] = await productService.fetchFlyers();

      areFlyersLoading.value = false;
      isFlyersLoadingError.value = !!error;
      flyers.value = parsedFlyers;
    }

    const areBusinessCardsLoading = ref(false);
    const isBusinessCardsLoadingError = ref(false);
    const businessCards: Ref<UnwrapRef<Maybe<ProductList>>> = ref(null);

    async function getBusinessCards() {
      isBusinessCardsLoadingError.value = false;
      areBusinessCardsLoading.value = true;

      const [error, parsedBusinessCards] = await productService.fetchBusinessCards();

      areBusinessCardsLoading.value = false;
      isBusinessCardsLoadingError.value = !!error;
      businessCards.value = parsedBusinessCards;
    }

    return {
      posters,
      arePostersLoading,
      isPostersLoadingError,
      getPosters,
      flyers,
      areFlyersLoading,
      isFlyersLoadingError,
      getFlyers,
      businessCards,
      areBusinessCardsLoading,
      isBusinessCardsLoadingError,
      getBusinessCards
    };
  })
}
