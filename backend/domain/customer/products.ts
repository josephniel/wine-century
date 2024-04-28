import { type ProductCategory as DBProductCategory } from '../../interface/database/entities/ProductCategory';
import { type ProductCategoriesRepository } from '../../interface/database/repositories/ProductCategoriesRepository';
import {
  type ListProductCategoriesResponse,
  type ProductCategory
} from '../../interface/https/customer/products';

export class ProductsHandler {
  private readonly productCategoriesRepo: ProductCategoriesRepository;

  constructor(productCategoriesRepo: ProductCategoriesRepository) {
    this.productCategoriesRepo = productCategoriesRepo;
  }

  listProductCategories = async (): Promise<ListProductCategoriesResponse> => {
    const productCategories = await this.productCategoriesRepo.list();

    return {
      productCategories: productCategories.map(
        (productCategory: DBProductCategory): ProductCategory => ({
          id: productCategory.id,
          name: productCategory.name,
          imageLink: productCategory.imageLink,
          createdAt: productCategory.createdAt.toISOString()
        })
      ),
      hasMore: false
    };
  };
}
