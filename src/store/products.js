import nmstore from '~/util/storage';
import Product from '../models/Product';

const state = {
  all: [],
  loading: true
};

const getters = {};

const actions = {
  // Gets all products from localforage
  getProducts: ({ commit }) => {
    return nmstore
      .getItem('products')
      .then(products => {
        if (products) {
          return products;
        } else {
          // Load in default data if localforage is empty
          return nmstore
            .setItem('products', require('~/data/products').default)
            .then(data => {
              return data;
            });
        }
      })
      .then(products => {
        let models = [];

        // forage doesn't retain class Product, loop plain objects and reconstruct
        products.forEach(obj => {
          models.push(new Product(...Object.values(obj)));
        });

        commit('setProducts', models);
        return models;
      });
  }
};

const mutations = {
  setProducts: (state, payload) => {
    state.loading = false;
    state.all = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
