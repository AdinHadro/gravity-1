export const state = () => {
  return { productCount: 0 };
};

export const getters = {
  productCount: state => {
    return state.productCount;
  }
};

export const mutations = {
  newProductAdded(state) {
    state.productCount++;
  }
};
