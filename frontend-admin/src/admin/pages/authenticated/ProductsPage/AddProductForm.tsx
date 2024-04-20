import './AddProductForm.scss';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { addProduct } from '../../../api/products';
import type Product from '../../../data/product';
import { useAuth } from '../../../providers/AuthProvider';

export interface AddProductFormProps {
  categoryID: number;
  categoryName: string;
  insertProductToTable: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState('');

  const { token } = useAuth();

  const addNewProduct = async (): Promise<void> => {
    const product = await addProduct(token, {
      name,
      price,
      details,
      categoryID: props.categoryID
    });
    props.insertProductToTable(product);
  };

  return (
    <Form className="addProductForm bg-light">
      <Row>
        <Col>
          <h5>Add {props.categoryName}</h5>
        </Col>
        <Col>
          <Button
            variant="success"
            className="float-end"
            onClick={(e) => {
              void addNewProduct();
            }}>
            Add {props.categoryName}
          </Button>
        </Col>
      </Row>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label>{props.categoryName} Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            defaultValue={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>{props.categoryName} Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            defaultValue={price}
            required
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={3}
            placeholder="Enter product description"
            defaultValue={details}
            required
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />
        </Form.Group>
      </Row>
    </Form>
  );
};

export default AddProductForm;
