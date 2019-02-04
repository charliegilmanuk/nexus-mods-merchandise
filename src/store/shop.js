import nmstore from '~/util/storage';
import Product from '../models/Product';
import Vue from 'vue';

const state = {
  products: [],
  loading: true,
  cart: [],
  cartLoading: true
};

const getters = {
  // Return count of products with their quantities
  cartCount: state => {
    let count = 0;

    state.cart.forEach(obj => {
      count += obj.quantity;
    });

    return count;
  },

  // Return cart items with the product model info
  cartProducts: state => {
    let items = [];

    state.cart.forEach(item => {
      let product = state.products.find(x => x.id === item.id);
      product.quantity = item.quantity;

      items.push(product);
    });

    return items;
  },

  // Return total cost of cart
  cartTotal: (state, getters) => {
    let total = 0;

    getters.cartProducts.forEach(item => {
      console.log('multiplying ' + item.price + ' with ' + item.quantity);
      total += parseFloat(parseFloat(item.price) * parseInt(item.quantity));
    });

    return total.toFixed(2);
  }
};

const actions = {
  // Gets all products from localforage
  getProducts: ({ commit }) => {
    return new Promise(resolve => {
      return nmstore
        .getItem('products')
        .then(products => {
          if (products) {
            return products;
          } else {
            // Load in default data if localforage is empty
            return nmstore
              .setItem('products', require('~/data/products').default)
              .then(data => data);
          }
        })
        .then(products => {
          let models = [];

          // forage doesn't retain class Product, loop plain objects and reconstruct
          products.forEach(obj => {
            models.push(new Product(...Object.values(obj)));
          });

          commit('setProducts', models);
          resolve(models);
        });
    });
  },

  // Create new Product instance from args, commit to state and forage
  addProduct: ({ state, commit }, product) => {
    return new Promise(resolve => {
      product.id = state.products[state.products.length - 1].id + 1;
      product = new Product(...Object.values(product));

      commit('setProduct', product);

      nmstore.setItem('products', state.products).then(() => {
        resolve(product);
      });
    });
  },

  // Reconstruct Product instance from args, match to state and update state and forage
  // Could be combined with addProduct but kept apart in case of future complexities
  updateProduct: ({ state, commit }, product) => {
    return new Promise(resolve => {
      product = new Product(...Object.values(product));

      commit('setProduct', product);

      nmstore.setItem('products', state.products).then(() => {
        resolve(product);
      });
    });
  },

  // Delete selected product(s), expects array
  deleteProducts: ({ state, commit, dispatch }, products) => {
    dispatch('removeFromCart', products);

    return new Promise(resolve => {
      products.forEach(obj => {
        let i = state.products.findIndex(product => product.id == obj.id);
        commit('removeProductByIndex', i);
      });

      nmstore.setItem('products', state.products).then(() => {
        commit('setProducts', state.products);
      });

      resolve(state.products);
    });
  },

  // Get items in cart from storage
  getCart: ({ commit }) => {
    return new Promise(resolve => {
      return nmstore
        .getItem('cart')
        .then(response => {
          if (response) {
            return response;
          } else {
            return nmstore.setItem('cart', []).then(response => response);
          }
        })
        .then(cart => {
          commit('setCart', cart);
          resolve(cart);
        });
    });
  },

  // Add item object containing id and quantity to cart
  addToCart: ({ state, commit }, item) => {
    return new Promise((resolve, reject) => {
      if (item.id) {
        if (!item.quantity) item.quantity = 1;

        commit('setCartProduct', item);

        nmstore.setItem('cart', state.cart).then(cart => {
          resolve(cart);
        });
      } else {
        reject('No product ID specified');
      }
    });
  },

  // Accepts array of items
  removeFromCart: ({ state, commit }, item) => {
    return new Promise(resolve => {
      item.forEach(obj => {
        let i = state.cart.findIndex(product => product.id == obj.id);
        commit('removeFromCartByIndex', i);
      });

      nmstore.setItem('cart', state.cart).then(() => {
        commit('setCart', state.cart);
      });

      resolve(state.cart);
    });
  }
};

const mutations = {
  // Set products.all state
  setProducts: (state, payload) => {
    state.loading = false;
    state.products = payload;
  },

  // Set an individual product, either new or updated
  setProduct: (state, payload) => {
    let i = state.products.findIndex(product => product.id === payload.id);

    if (i >= 0) {
      Vue.set(state.products, i, payload);
    } else {
      state.products.push(payload);
    }
  },

  // Remove product from state by index
  removeProductByIndex: (state, index) => {
    state.products.splice(index, 1);
  },

  // Set cart items
  setCart: (state, payload) => {
    state.cart = payload;
    state.cartLoading = false;
  },

  // Add or update cart item in state
  setCartProduct: (state, payload) => {
    const i = state.cart.findIndex(product => product.id === payload.id);

    if (i >= 0) {
      state.cart[i].quantity += payload.quantity;
    } else {
      state.cart.push(payload);
    }
  },

  // Remove product from cart by index
  removeFromCartByIndex: (state, index) => {
    state.cart.splice(index, 1);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
