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

export default {
  components: {
    'header-component': Header,
    'footer-component': Footer
  }
};
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
