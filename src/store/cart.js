import nmstore from '~/util/storage';
// import Product from '../models/Product';
// import Vue from 'vue';

const state = {
  products: [],
  loading: true
};

const getters = {};

const actions = {
  // Get items added to cart from localforage
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

  addToCart: () => {}
};

const mutations = {
  setCart: (state, payload) => {
    state.loading = false;
    state.products = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
