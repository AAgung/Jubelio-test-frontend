import React, { useContext } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';

const ProductModalDetail = observer(() => {
  const productStore = useContext(ProductStoreContext);
  if(!productStore.productSelectedData) {
    productStore.productSelectedData = {
      sku: '',
      name: '',
      price: 0,
      description: '',
      image: '',
    };
  } else productStore.productSelectedData.image = '';
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
          <Modal.Title>{productStore.productSelectedData.oldSKU ? `Update Product ${productStore.productSelectedData.sku}` : 'Create Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-2" controlId="input-product_sku" label="SKU * No">
            <Form.Control type="text" placeholder="Enter SKU No ..." value={productStore.productSelectedData?.sku} required 
              onChange={(e) => {
                productStore.productSelectedData.sku = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_name" label="Name *">
            <Form.Control type="text" placeholder="Enter Name ..." value={productStore.productSelectedData?.name} required
              onChange={(e) => {
                productStore.productSelectedData.name = e.target.value;
              }}
            />
          </FloatingLabel>
          
          <FloatingLabel className="mb-2" controlId="input-product_price" label="Price *">
            <Form.Control type="number" min="0" placeholder="Enter Price ..." value={productStore.productSelectedData?.price} required
              onChange={(e) => {
                productStore.productSelectedData.price = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_description" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Enter Description ..."
              style={{ height: '100px' }}
              value={productStore.productSelectedData?.description}
              onChange={(e) => {
                productStore.productSelectedData.description = e.target.value;
              }}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="input-product_image" label="Image">
            <Form.Control type="file" accept="image/jpg,image/jpeg,image/png" 
              onChange={(e) => {
                productStore.productSelectedData.image = e.target.files[0];
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              productStore.handleModalDetailClose();
            }}>Close</Button>
          <Button variant="primary" onClick={(e) => {
            productStore.handleModalDetailSubmit(e);
          }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
});

export default ProductModalDetail;
