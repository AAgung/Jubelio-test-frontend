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

  importProductFromElevania() {
    console.log('import');
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