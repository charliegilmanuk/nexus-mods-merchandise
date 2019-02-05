<template>
  <v-container grid-list-xl class="pa-5" id="shop-container">
    <v-toolbar dense class="transparent pa-0" flat>
      <v-text-field
        v-model="search"
        solo
        single-line
        hide-actions
        hide-details
        placeholder="Search product..."
        append-icon="search"
        clearable
      ></v-text-field>
      <span class="ml-3">
        {{ pageStart + 1 }} – {{ pageFinish }} of
        {{ filteredProducts.length }}
        {{ pluralize('result', filteredProducts.length) }}
        <span v-if="search"> found for '{{ search }}'</span>
        <span v-else>found</span>
      </span>
      <v-spacer></v-spacer>
      <v-combobox
        v-model="pageSize"
        :items="pageSizes"
        solo
        single-line
        hide-actions
        hide-details
        label="Per page"
        class="shrink mr-2"
      ></v-combobox>
      <!-- <v-combobox
        v-model="sortingOn"
        :items="sortables"
        solo
        single-line
        hide-actions
        hide-details
        label="Sort by"
        class="shrink"
      >
      </v-combobox> -->
    </v-toolbar>
    <v-layout wrap class="py-5">
      <v-flex xs12 class="py-5 text-xs-center" v-if="loading">
        <v-progress-circular
          :size="64"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex
        xs6
        md4
        lg3
        v-for="product in pagedProducts"
        :key="product.id"
        class="mx-0"
        transition="slide-y-transition"
      >
        <product-card :product="product"></product-card>
      </v-flex>
      <v-flex xs12 class="text-xs-center py-5">
        <v-pagination
          v-model="page"
          :length="pagesTotal"
          v-if="pagesTotal > 1"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import pluralize from 'pluralize';
import ProductCard from '~/components/ProductCard';

export default {
  name: 'Shop',
  components: {
    'product-card': ProductCard
  },
  data: () => ({
    search: '',
    searchables: ['name', 'description'],
    page: 1,
    pageSize: 6,
    pageSizes: [6, 12, 25, 50],
    sortables: [
      'Expiry date',
      'Date added',
      '% to backed (low–high)',
      '% to backed (high–low)'
    ],
    sortingOn: null
  }),
  watch: {
    page() {
      this.$vuetify.goTo('#shop-container');
    }
  },
  computed: {
    ...mapState({
      products: state => state.shop.products,
      loading: state => state.shop.loading
    }),

    pageStart() {
      return this.page * this.pageSize - this.pageSize;
    },

    pageFinish() {
      let finish = this.pageStart + this.pageSize;

      if (finish > this.filteredProducts.length) {
        return this.filteredProducts.length;
      }

      return finish;
    },

    // Total pages available
    pagesTotal() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },

    // Takes filteredProducts and paginates them
    pagedProducts() {
      let results = [];

      if (this.filteredProducts.length) {
        for (let i = this.pageStart; i < this.pageFinish; i++) {
          if (this.filteredProducts[i]) {
            results.push(this.filteredProducts[i]);
          }
        }
      }

      return results;
    },

    // Filter products searchables by search query
    filteredProducts() {
      let results = [];

      if (this.search) {
        this.products.forEach(product => {
          let matched = false;

          this.searchables.forEach(key => {
            if (product[key].match(new RegExp(this.search, 'i'))) {
              matched = true;
            }
          });

          if (matched) {
            results.push(product);
          }
        });
      } else {
        results = this.products;
      }

      return results;
    }
  },
  methods: {
    pluralize: pluralize
  }
};
</script>
