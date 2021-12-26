import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';

const ProductHeader = observer(({ product }) => {
  const productStore = useContext(ProductStoreContext);

  return (
    <div className='d-flex flex-column flex-md-row justify-content-center justify-content-md-between'>
      <h1>Product List</h1>
      <div>
        <Button variant="success" className='me-2'
          onClick={() => {
            productStore.importProductFromElevania();
          }}>Import from Elevania</Button>
        <Button variant="primary" onClick={() => {
          productStore.handleModalDetailShow();
        }}>Add</Button>
      </div>
    </div>
  )
});

export default ProductHeader;
