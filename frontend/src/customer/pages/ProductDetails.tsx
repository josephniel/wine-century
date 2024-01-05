import React from 'react';

export interface ProductDetailsProps {
  name: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = (props: ProductDetailsProps) => {
  return <section style={{ height: '1000px' }}>{props.name}</section>;
};

export default ProductDetails;
