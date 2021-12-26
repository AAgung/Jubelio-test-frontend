import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './pages/product';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

export default function App() {
  return (
    <>
      <ProductPage />
    </>
  );
}
