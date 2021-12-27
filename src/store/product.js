import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";

class ProductStore {
  page = 1;
  products = [];
  productSelectedSKU = '';
  productSelectedData = null;
  isModalDetailShow = false;
  
  constructor() {
    makeObservable(this, {
      page: observable,
      products: observable,
      productSelectedSKU: observable,
      productSelectedData: observable,
      isModalDetailShow: observable,
      getProduct: action,
      createProduct: action,
      updateProduct: action,
      importProductFromElevania: action,
      deleteProduct: action,
      handleModalDetailShow: action,
      handleModalDetailClose: action,
      handleModalDetailSubmit: action,
    })
  }

  // action handler to get product with page query param 
  getProduct() {
    let url = process.env.REACT_APP_API_URL + `/products?page=${this.page}`;
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(this.page > 1) {
            if(result.data) {
              this.products = [...this.products, ...result.data];
              this.page++;
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

  // action handler to create product
  createProduct(payload, cb) {
    let url = process.env.REACT_APP_API_URL + `/products`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: payload
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(!result.success) {
            if(result.data) {
              alert(result.data[0].message);
            } else alert(result.message);
          }

          if(result.success) {
            this.page = 1;
            this.getProduct();
            this.handleModalDetailClose();
            alert(result.message);
          }
          cb();
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  // action handler to update product
  updateProduct(payload, cb) {
    let url = process.env.REACT_APP_API_URL + `/products/${this.productSelectedSKU}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json'
        },
        body: payload
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(!result.success) {
            if(result.data) {
              alert(result.data[0].message);
            } else alert(result.message);
          }
          
          if(result.success) {
            this.page = 1;
            this.getProduct();
            this.handleModalDetailClose();
            alert(result.message);
          }

          cb();
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  // action handler to import product from elevania
  importProductFromElevania(e) {
    e.target.disabled = true;
    let url = process.env.REACT_APP_API_URL + '/products/import-from-elevania';
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          e.target.disabled = false;
          window.location.reload();
          alert(result.message);
        })
        .catch((error) => {
          e.target.disabled = false;
          alert('Something error with import data process');
          console.error('Error:', error);
        });
  }

  // action handler to delete product
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

  // action handler for modal detail product
  handleModalDetailShow(product = null) {
    this.isModalDetailShow = true;
    this.productSelectedSKU = product ? product.sku : '';
    this.productSelectedData = Object.assign({}, product);
  }

  handleModalDetailClose() {
    this.isModalDetailShow = false;
    this.productSelectedSKU = '';
    this.productSelectedData = null;
  }

  handleModalDetailSubmit(e) {
    e.target.disabled = true;
    const formData = new FormData();
    formData.append('sku', this.productSelectedData.sku ?? '');
    formData.append('name', this.productSelectedData.name ?? '');
    formData.append('price', this.productSelectedData.price ?? '');
    formData.append('description', this.productSelectedData.description ?? '');
    formData.append('image', this.productSelectedData.image ?? '');

    if(this.productSelectedSKU) { // update
      this.updateProduct(formData, () => {
        e.target.disabled = false;
      });
    } else {
      this.createProduct(formData, () => {
        e.target.disabled = false;
      });
    }
  }
}

export const ProductStoreContext = createContext(new ProductStore());