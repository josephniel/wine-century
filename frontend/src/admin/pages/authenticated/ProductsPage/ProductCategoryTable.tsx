import './ProductCategoryTable.scss';

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { deleteProductCategory, editProductCategory } from '../../../api/products';
import type ProductCategory from '../../../data/productCategory';
import { useAuth } from '../../../providers/AuthProvider';
import AddProductCategoryForm from './AddProductCategoryForm';

interface DeleteCategoryModalProps {
  categoryID: number;
  categoryName: string;
  showDeleteCategoryModal: boolean;
  setShowDeleteCategoryModal: Dispatch<SetStateAction<boolean>>;
  removeCategory: (id: number) => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (props) => {
  const { token } = useAuth();

  const deleteCategory = async (id: number): Promise<void> => {
    await deleteProductCategory(token, id);
    props.removeCategory(id);
    props.setShowDeleteCategoryModal(false);
  };

  return (
    <Modal
      show={props.showDeleteCategoryModal}
      onHide={() => {
        props.setShowDeleteCategoryModal(false);
      }}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {props.categoryName} category? This will delete ALL of the
        products associated to it.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={(e) => {
            props.setShowDeleteCategoryModal(false);
          }}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            void deleteCategory(props.categoryID);
          }}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export interface ProductCategoryRowProps {
  productCategory: ProductCategory;
  editCategory: (id: number, category: ProductCategory) => void;
  deleteCategory: (id: number) => void;
}

const ProductCategoryRow: React.FC<ProductCategoryRowProps> = (props) => {
  const { token } = useAuth();

  const [productCategory, setProductCategory] = useState(props.productCategory);
  const [categoryEditable, setCategoryEditable] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  const editCategory = async (category: ProductCategory): Promise<void> => {
    const newProductCategory = await editProductCategory(token, category.id, category.name);
    props.editCategory(category.id, newProductCategory);
    setProductCategory(newProductCategory);
    setCategoryEditable(false);
  };

  return (
    <>
      <tr key={productCategory.id}>
        <th className="text-center">{productCategory.id}</th>
        <td>
          <Form.Control
            className="productCategoryTableInput float-start"
            onChange={(e) => {
              setProductCategory({
                ...productCategory,
                name: e.target.value
              });
            }}
            defaultValue={productCategory.name}
            plaintext={!categoryEditable}
            readOnly={!categoryEditable}
          />
        </td>
        <td className="actionsColumn">
          {!categoryEditable ? (
            <Button
              className="editProductCategoryIcon"
              variant="primary"
              onClick={(e) => {
                setCategoryEditable(true);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil "
                viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>
            </Button>
          ) : (
            <Button
              className="editProductCategoryIcon"
              variant="success"
              onClick={(e) => {
                void editCategory(productCategory);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check2 "
                viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
              </svg>
            </Button>
          )}
          <Button
            className="deleteProductCategoryIcon"
            variant="danger"
            onClick={(e) => {
              setShowDeleteCategoryModal(true);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </Button>
        </td>
      </tr>

      <DeleteCategoryModal
        categoryID={productCategory.id}
        categoryName={productCategory.name}
        removeCategory={props.deleteCategory}
        setShowDeleteCategoryModal={setShowDeleteCategoryModal}
        showDeleteCategoryModal={showDeleteCategoryModal}
      />
    </>
  );
};

export interface ProductCategoryTableProps {
  productCategories: ProductCategory[];
  addCategory: (category: ProductCategory) => void;
  editCategory: (id: number, category: ProductCategory) => void;
  deleteCategory: (id: number) => void;
}

const ProductCategoryTable: React.FC<ProductCategoryTableProps> = (props) => {
  const [productCategories, setProductCategories] = useState(props.productCategories);

  useEffect(() => {
    if (props.productCategories.length !== 0) {
      setProductCategories(props.productCategories);
    }
  }, [props.productCategories]);

  const addCategory = (category: ProductCategory): void => {
    props.addCategory(category);
    setProductCategories([...productCategories, category]);
  };

  const deleteCategory = (id: number): void => {
    props.deleteCategory(id);
    setProductCategories(productCategories.filter((category) => category.id !== id));
  };

  const editCategory = (id: number, category: ProductCategory): void => {
    props.editCategory(id, category);
  };

  return (
    <>
      <AddProductCategoryForm addCategory={addCategory} />
      <Table hover bordered className="productCategoryTable">
        <thead className="table-light">
          <tr>
            <th className="text-center">ID</th>
            <th>Name</th>
            <th className="actionsColumn">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map((category: ProductCategory, index: number) => (
            <ProductCategoryRow
              productCategory={category}
              editCategory={editCategory}
              deleteCategory={deleteCategory}
              key={index}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductCategoryTable;
