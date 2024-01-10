import './ProductCategories.scss';

interface CategoryProps {
  name: string;
  image: string;
  link: string;
}

export interface ProductCategoriesProps {
  categories: CategoryProps[];
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => (
  <a href={props.link}>
    <div className="category">
      <img src={props.image} alt={props.name} />
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
      {props.categories.map((category: CategoryProps, index: number) => (
        <Category key={index} {...category} />
      ))}
    </div>
  </section>
);

export default ProductCategories;
