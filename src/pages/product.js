import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../components/product/ProductCard';
import ProductHeader from '../components/product/ProductHeader';
import ProductModalDetail from '../components/product/ProductModalDetail';
import { ProductStoreContext } from '../store/product';
import { observer } from 'mobx-react';

const productMock = [
  {
    sku: 1324134,
    name: 'Product A',
    description: 'This is description for Product A',
    price: 1000.00,
    image: 'https://dummyimage.com/600x400/000/fff'
  },
  {
    sku: 12341123,
    name: 'Product B',
    description: 'This is description for Product B lasdfkdjfa adfkjadlfj',
    price: 1000.00,
    image: 'https://dummyimage.com/600x400/000/fff'
  }
]

const product = observer(() => {
  const productStore = useContext(ProductStoreContext);

  useEffect(() => {
    productStore.isModalDetailShow = false;
    productStore.products = productMock;
    productStore.productSelected = null;
  }, [productStore]);

  if(productStore.products.length <= 0) {
    return (
      <Container className='mt-3'>
        <ProductHeader />
        <Row className='justify-content-center'>
          Product no available
        </Row>
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