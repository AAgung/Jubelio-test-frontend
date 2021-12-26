import React, { useContext } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';

const ProductModalDetail = observer(() => {
  const productStore = useContext(ProductStoreContext);
  if(!productStore.productSelected) {
    productStore.productSelected = {
      sku: '',
      name: '',
      price: 0,
      description: '',
      image: '',
    };
  }
  console.log(productStore.productSelected.image)
  return (
    <Modal
      show={productStore.isModalDetailShow}
      onHide={() => {
        productStore.handleModalDetailClose();
      }}
      backdrop="static"
      keyboard={false}
      >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{productStore.productSelected ? `Update Product ${productStore.productSelected.sku}` : 'Create Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-2" controlId="input-product_sku" label="SKU No">
            <Form.Control type="text" placeholder="Enter SKU No ..." value={productStore.productSelected?.sku} 
              onChange={(e) => {
                productStore.productSelected.sku = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_name" label="Name">
            <Form.Control type="text" placeholder="Enter Name ..." value={productStore.productSelected?.name} 
              onChange={(e) => {
                productStore.productSelected.name = e.target.value;
              }}
            />
          </FloatingLabel>
          
          <FloatingLabel className="mb-2" controlId="input-product_price" label="Price">
            <Form.Control type="number" min="0" placeholder="Enter Price ..." value={productStore.productSelected?.price} 
              onChange={(e) => {
                productStore.productSelected.price = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_description" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Enter Description ..."
              style={{ height: '100px' }}
              onChange={(e) => {
                productStore.productSelected.description = e.target.value;
              }}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="input-product_image" label="Image">
            <Form.Control type="file" accept="image/jpg,image/jpeg,image/png" 
              onChange={(e) => {
                productStore.productSelected.image = e.target.files;
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              productStore.handleModalDetailClose();
            }}>Close</Button>
          <Button variant="primary" onClick={() => {
              productStore.handleModalDetailSubmit({});
            }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
});

export default ProductModalDetail;
