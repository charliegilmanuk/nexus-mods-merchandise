import nmstore from '~/util/storage';
import Product from '../models/Product';
import Vue from 'vue';

const state = {
  all: [],
  loading: true
};

const getters = {};

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
    console.log('addProduct called with: ', product);
    return new Promise(resolve => {
      product.id = state.all[state.all.length - 1].id + 1;
      product = new Product(...Object.values(product));

      commit('setProduct', product);

      nmstore.setItem('products', state.all).then(() => {
        resolve(product);
      });
    });
  },

  // Reconstruct Product instance from args, match to state and update state and forage
  // Could be combined with addProduct but kept apart in case of future complexities
  updateProduct: ({ state, commit }, product) => {
    console.log('updateProduct called with: ', product);
    return new Promise(resolve => {
      product = new Product(...Object.values(product));

      commit('setProduct', product);

      nmstore.setItem('products', state.all).then(() => {
        resolve(product);
      });
    });
  },

  // Delete selected product(s), expects array
  deleteProducts: ({ state, commit }, products) => {
    return new Promise(resolve => {
      products.forEach(obj => {
        let i = state.all.findIndex(product => product.id == obj.id);
        commit('removeProductByIndex', i);
      });

      nmstore.setItem('products', state.all).then(() => {
        commit('setProducts', state.all);
      });

      resolve(state.all);
    });
  }
};

const mutations = {
  // Set products.all state
  setProducts: (state, payload) => {
    state.loading = false;
    state.all = payload;
  },

  // Set an individual product, either new or updated
  setProduct: (state, payload) => {
    let i = state.all.findIndex(product => product.id === payload.id);

    console.log('setProduct called, index to replace: ', i);

    if (i >= 0) {
      Vue.set(state.all, i, payload);
    } else {
      state.all.push(payload);
    }
  },

  // Remove product from state by index
  removeProductByIndex: (state, index) => {
    state.all.splice(index, 1);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
