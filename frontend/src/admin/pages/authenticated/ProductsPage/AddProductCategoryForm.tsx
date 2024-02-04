import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { addProductCategory } from '../../../api/products';
import type ProductCategory from '../../../data/productCategory';
import { useAuth } from '../../../providers/AuthProvider';

export interface AddProductCategoryFormProps {
  addCategory: (category: ProductCategory) => void;
}

const AddProductCategoryForm: React.FC<AddProductCategoryFormProps> = (props) => {
  const [newProductCategory, setNewProductCategory] = useState('');

  const { token } = useAuth();

  const addCategory = async (): Promise<void> => {
    const productCategory = await addProductCategory(token, newProductCategory);
    props.addCategory(productCategory);
    setNewProductCategory('');
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        id="newProductCategoryInput"
        placeholder="Product Category"
        aria-label="Product Category"
        value={newProductCategory}
        onChange={(e) => {
          setNewProductCategory(e.target.value);
        }}
      />
      <Button
        variant="success"
        onClick={(e) => {
          void addCategory();
        }}>
        Add new category
      </Button>
    </InputGroup>
  );
};

export default AddProductCategoryForm;
