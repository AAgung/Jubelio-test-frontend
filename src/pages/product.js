import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../components/product/ProductCard';
import ProductHeader from '../components/product/ProductHeader';
import ProductModalDetail from '../components/product/ProductModalDetail';
import { ProductStoreContext } from '../store/product';
import { observer } from 'mobx-react';

const product = observer(() => {
  const productStore = useContext(ProductStoreContext);

  window.onscroll = () => {    
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      productStore.getProduct();
    }
  }

  useEffect(async () => {
    await productStore.getProduct();
    productStore.isModalDetailShow = false;
    productStore.productSelected = null;
  }, [productStore]);

  if(productStore.products.length <= 0) {
    return (
      <Container className='mt-3'>
        <ProductHeader />
        <Row className='justify-content-center'>
          Product no available
        </Row>

        <ProductModalDetail />
      </Container>
    )
  }

  return (
    <Container className='mt-3'>
      <ProductHeader />
      <Row className='mt-3'>
        {productStore.products.map(product => (
          <ProductCard
            key={product.sku}
            product={product}
          />
        ))}
      </Row>
      
      <ProductModalDetail />
    </Container>
  )
});

export default product;