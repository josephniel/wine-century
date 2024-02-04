import './index.scss';

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { getProductCategories } from '../../../api/products';
import type ProductCategory from '../../../data/productCategory';
import { useAuth } from '../../../providers/AuthProvider';
import ProductCategoryTable from './ProductCategoryTable';
import ProductTable from './ProductTable';

const ProductsPage: React.FC = () => {
  const [productCategories, setProductCategories] = useState([] as ProductCategory[]);

  const { token } = useAuth();

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      const productCategoryList = await getProductCategories(token);
      setProductCategories([...productCategories, ...productCategoryList.productCategories]);
    };

    loadCategories().catch(console.error);
  }, []);

  const addTab = (category: ProductCategory): void => {
    setProductCategories([...productCategories, category]);
  };

  const editTab = (id: number, newCategory: ProductCategory): void => {
    setProductCategories(
      productCategories.map((category: ProductCategory) => {
        if (category.id === id) {
          return {
            ...category,
            ...newCategory
          };
        }
        return category;
      })
    );
  };

  const deleteTab = (id: number): void => {
    setProductCategories(
      productCategories.filter((category: ProductCategory) => category.id !== id)
    );
  };

  return (
    <section className="productsPage my-3">
      <Container>
        <Tabs defaultActiveKey="add" id="products-tab" className="mb-3" fill>
          {productCategories.map((productCategory: ProductCategory) => (
            <Tab
              key={productCategory.id}
              eventKey={productCategory.id}
              title={productCategory.name}>
              <ProductTable categoryID={productCategory.id} categoryName={productCategory.name} />
            </Tab>
          ))}
          <Tab eventKey="add" title="Add Category">
            <ProductCategoryTable
              productCategories={productCategories}
              addCategory={addTab}
              editCategory={editTab}
              deleteCategory={deleteTab}
            />
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default ProductsPage;
