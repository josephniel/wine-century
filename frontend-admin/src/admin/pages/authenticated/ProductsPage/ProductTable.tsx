import './ProductTable.scss';

import React, { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { deleteProduct, editProduct, getProducts, PRODUCT_LIST_LIMIT } from '../../../api/products';
import type Product from '../../../data/product';
import { useAuth } from '../../../providers/AuthProvider';
import AddProductForm from './AddProductForm';

interface ProductDetailsModalProps {
  categoryName: string;
  currentProduct: Product;
  showProductDetailsModal: boolean;
  setShowProductDetailsModal: Dispatch<SetStateAction<boolean>>;
  editProductInTable: (id: number, product: Product) => void;
  deleteProductInTable: (id: number) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = (props) => {
  const { token } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(props.currentProduct);
  }, [props.currentProduct]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  const setName: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    if (product === null) {
      throw new Error('Product cannot be null');
    }

    setProduct({
      ...product,
      name: (e.target as HTMLInputElement).value
    });
  };

  const setPrice: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    if (product === null) {
      throw new Error('Product cannot be null');
    }

    setProduct({
      ...product,
      price: Number((e.target as HTMLInputElement).value)
    });
  };

  const setDetails: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    if (product === null) {
      throw new Error('Product cannot be null');
    }

    setProduct({
      ...product,
      details: (e.target as HTMLInputElement).value
    });
  };

  const saveProduct = async (): Promise<void> => {
    if (product === null) {
      throw new Error('Product cannot be null');
    }

    const newProduct = await editProduct(token, product);
    props.editProductInTable(product.id, newProduct);
    setProduct(newProduct);
    props.setShowProductDetailsModal(false);
  };

  const removeProduct = async (): Promise<void> => {
    if (product === null) {
      throw new Error('Product cannot be null');
    }

    await deleteProduct(token, product.id);
    props.deleteProductInTable(product.id);
    setProduct(null);
    props.setShowProductDetailsModal(false);
  };

  return product !== null ? (
    <Modal
      show={props.showProductDetailsModal}
      onHide={() => {
        props.setShowProductDetailsModal(false);
      }}
      size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="productDetailsModalBody">
          <Row>
            <Form.Group as={Col} md="2">
              <Form.Label>{props.categoryName} ID</Form.Label>
              <Form.Control type="text" value={product.id} readOnly disabled />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>{props.categoryName} Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product.name}
                required
                onChange={setName}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>{props.categoryName} Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={product.price}
                required
                onChange={setPrice}
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
                value={product.details}
                required
                onChange={setDetails}
              />
            </Form.Group>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={(e) => {
            void removeProduct();
          }}>
          Delete
        </Button>
        <Button
          variant="success"
          onClick={(e) => {
            void saveProduct();
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

interface ProductTableRowProps extends Product {
  setCurrentProduct: Dispatch<SetStateAction<any>>;
  setShowProductDetailsModal: Dispatch<SetStateAction<boolean>>;
}

const ProductTableRow: React.FC<ProductTableRowProps> = (props) => {
  const showProduct = (): void => {
    props.setCurrentProduct({
      id: props.id,
      name: props.name,
      price: props.price,
      details: props.details
    });
    props.setShowProductDetailsModal(true);
  };

  return (
    <tr>
      <th className="text-center">{props.id}</th>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.details}</td>
      <td className="text-center">
        <Button
          className="btn-primary"
          onClick={() => {
            showProduct();
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye"
            viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        </Button>
      </td>
    </tr>
  );
};

interface ProductTableProps {
  categoryID: number;
  categoryName: string;
}

const ProductTable: React.FC<ProductTableProps> = (props) => {
  const [products, setProducts] = useState([] as Product[]);
  const [hasMore, setHasMore] = useState(true);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    loadMoreProducts().catch(console.error);
  }, []);

  const loadMoreProducts = async (): Promise<void> => {
    if (!hasMore) {
      return;
    }

    const productList = await getProducts(
      token,
      props.categoryID,
      PRODUCT_LIST_LIMIT,
      products.length
    );
    setProducts([...products, ...productList.products]);
    setHasMore(productList.hasMore);
  };

  const addRow = (product: Product): void => {
    setProducts([product, ...products]);
  };

  const editRow = (id: number, newProduct: Product): void => {
    setProducts(products.map((product) => (product.id === id ? newProduct : product)));
  };

  const deleteRow = (id: number): void => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <>
      <AddProductForm
        categoryID={props.categoryID}
        categoryName={props.categoryName}
        insertProductToTable={addRow}
      />
      <Table hover bordered className="align-middle">
        <thead className="table-light">
          <tr>
            <th className="text-center">ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Summary</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.length !== 0 ? (
            products.map((product: Product, index: number) => (
              <ProductTableRow
                {...product}
                key={index}
                setCurrentProduct={setCurrentProduct}
                setShowProductDetailsModal={setShowProductDetailsModal}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>There are no products.</td>
            </tr>
          )}
        </tbody>
        <tfoot className="table-light">
          <tr>
            <td colSpan={5}>
              <Button
                size="sm"
                variant="primary"
                className="float-end"
                disabled={!hasMore}
                onClick={(e) => {
                  void loadMoreProducts();
                }}>
                Load More
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
      {currentProduct !== null ? (
        <ProductDetailsModal
          categoryName={props.categoryName}
          currentProduct={currentProduct}
          showProductDetailsModal={showProductDetailsModal}
          setShowProductDetailsModal={setShowProductDetailsModal}
          editProductInTable={editRow}
          deleteProductInTable={deleteRow}
        />
      ) : null}
    </>
  );
};

export default ProductTable;
