import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

class ProductStore {
  page = 1;
  products = [];
  productSelected = null;
  isModalDetailShow = false;
  
  constructor() {
    makeAutoObservable(this, {
      page: observable,
      products: observable,
      productSelected: observable,
      isModalDetailShow: observable,
      handleModalDetailShow: action,
      handleModalDetailClose: action,
      handleModalDetailSubmit: action,
    })
  }

  importProductFromElevania(e) {
    e.target.disabled = true;
    let url = process.env.REACT_APP_API_URL + '/products/import-from-elevania';
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          e.target.disabled = false;
          alert(result.message);
        })
        .catch((error) => {
          e.target.disabled = false;
          alert('Something error with import process');
          console.error('Error:', error);
        });
  }

  deleteProduct(product = null) {
    console.log('delete');
  }

  handleModalDetailShow(product = null) {
    this.isModalDetailShow = true;
    this.productSelected = product;
  }

  handleModalDetailClose() {
    this.isModalDetailShow = false;
    this.productSelected = null;
  }

  handleModalDetailSubmit(payload) {
    if(this.productSelected) {
      console.log(this.productSelected);
    } else {
      console.log(payload);
    }
    this.handleModalDetailClose();
  }
}

export const ProductStoreContext = createContext(new ProductStore());