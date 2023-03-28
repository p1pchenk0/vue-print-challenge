import { makeProductStore } from '@/stores/products';
import { productService } from '@/services/product.service';

export const useProductStore = makeProductStore(productService);
