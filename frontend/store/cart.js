export const state = () => {
  return { products: loadFromStorage() };
};

export const getters = {
  productCount: state => {
    return state.products.length;
  },
  products: state => {
    return state.products;
  }
};

export const mutations = {
  addProduct(state, product) {
    state.products.push(product);
    setStorage(state.products);
  },
  deleteProduct(state, product) {
    state.products = state.products.filter(x => x.id !== product.id);
    setStorage(state.products);
  }
};

const loadFromStorage = () => {
  const basketString = window.localStorage.getItem("basket");
  const basket = basketString ? JSON.parse(basketString) : { products: [] };
  return basket.products;
};

const setStorage = products => {
  const basketString = JSON.stringify({ products });
  window.localStorage.setItem("basket", basketString);
};
