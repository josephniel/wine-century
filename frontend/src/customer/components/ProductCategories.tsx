import './ProductCategories.scss';

interface CategoryProps {
  name: string;
  imageLink: string;
}

export interface ProductCategoriesProps {
  productCategories: CategoryProps[];
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => (
  <a href={props.name.toLowerCase()}>
    <div className="category">
      <img src={props.imageLink} alt={props.name} />
      <span>{props.name}</span>
    </div>
  </a>
);

const ProductCategories: React.FC<ProductCategoriesProps> = (props: ProductCategoriesProps) => (
  <section className="productCategories">
    <div className="heading">
      <b>PRODUCT CATEGORIES</b>
    </div>
    <div className="body">
      {props.productCategories.map((category: CategoryProps, index: number) => (
        <Category key={index} {...category} />
      ))}
    </div>
  </section>
);

export default ProductCategories;
