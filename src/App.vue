<template>
  <v-app dark>
    <header-component></header-component>

    <v-content>
      <transition name="fade-transition">
        <router-view />
      </transition>
    </v-content>

    <footer-component></footer-component>
  </v-app>
</template>

<script>
import Header from '~/layout/Header';
import Footer from '~/layout/Footer';
import { mapActions } from 'vuex';

export default {
  components: {
    'header-component': Header,
    'footer-component': Footer
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    ...mapActions(['getProducts', 'getCart'])
  }
};
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
