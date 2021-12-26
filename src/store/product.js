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

  getProduct() {
    let url = process.env.REACT_APP_API_URL + `/products?page=${this.page}`;
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(this.page > 1) {
            if(result.data.length > 0) {
              this.page++;
              this.products = [...this.products, ...result.data];
            } 
          } else {
            this.products = result.data;
            this.page++;
          }
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  importProductFromElevania(e) {
    e.target.disabled = true;
    let url = process.env.REACT_APP_API_URL + '/products/import-from-elevania';
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          e.target.disabled = false;
          this.page = 1;
          this.getProduct();
          alert(result.message);
        })
        .catch((error) => {
          e.target.disabled = false;
          alert('Something error with import data process');
          console.error('Error:', error);
        });
  }

  deleteProduct(product = null) {
    if (window.confirm(`Are you sure to delete this product ${product.sku}`) === true) {
      let url = process.env.REACT_APP_API_URL + `/products/${product.sku}`;
        fetch(url, {
          method: 'DELETE'
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            this.page = 1;
            this.getProduct();
            alert(result.message);
          })
          .catch((error) => {
            alert('Something error with delete data process');
            console.error('Error:', error);
          });
    }
  }

  // Modal Detail Handler
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