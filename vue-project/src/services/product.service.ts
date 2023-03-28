import mockPosters from '../../../posters.json';
import mockFlyers from '../../../flyers.json';
import mockBusinessCards from '../../../businesscards.json';
import { ProductList } from '@/business/ProductList';
import type { Maybe, MaybeError } from '@/shared';

export interface IProductService {
  fetchPosters(): Promise<[MaybeError, Maybe<ProductList>]>;
  fetchFlyers(): Promise<[MaybeError, Maybe<ProductList>]>;
  fetchBusinessCards(): Promise<[MaybeError, Maybe<ProductList>]>;
}

export const productService: IProductService = {
  async fetchPosters(): Promise<[MaybeError, Maybe<ProductList>]> {
    try {
      const response = await Promise.resolve(mockPosters);

      return [null, new ProductList(response)];
    } catch (err) {
      return [err as MaybeError, null];
    }
  },
  async fetchFlyers(): Promise<[MaybeError, Maybe<ProductList>]> {
    try {
      const response = await Promise.resolve(mockFlyers);

      return [null, new ProductList(response)];
    } catch (err) {
      return [err as MaybeError, null];
    }
  },
  async fetchBusinessCards(): Promise<[MaybeError, Maybe<ProductList>]> {
    try {
      const response = await Promise.resolve(mockBusinessCards);

      return [null, new ProductList(response)];
    } catch (err) {
      return [err as MaybeError, null];
    }
  }
}
