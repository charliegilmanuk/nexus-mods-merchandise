<template>
  <v-container grid-list-xl class="pa-5">
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
        {{ filteredProducts.length }}
        {{ pluralize('products', filteredProducts.length) }}
        <span v-if="search"> found for '{{ search }}'</span>
        <span v-else>found</span>
      </span>
      <v-spacer></v-spacer>
      <v-combobox
        v-model="pageSize"
        :items="[5, 10, 25, 100]"
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
        v-for="product in filteredProducts"
        :key="product.id"
        class="mx-0"
        transition="slide-y-transition"
      >
        <v-card flat>
          <router-link
            :to="{ name: 'product', params: { id: product.id } }"
            style="text-decoration: none;"
            class="white--text"
          >
            <v-img
              :src="product.image"
              aspect-ratio="1.5"
              gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5) 25%, transparent"
            >
              <v-container fill-height fluid>
                <v-layout fill-height align-end>
                  <v-flex xs12 class="py-0">
                    <span class="headline">{{ product.name }}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </router-link>
          <v-card-title>
            <v-container class="pa-0">
              <v-layout column>
                <v-flex
                  align-center
                  align-content-center
                  justify-center
                  :class="[
                    product.expired
                      ? 'red--text'
                      : 'grey--text text--lighten-1',
                    'subtitle'
                  ]"
                >
                  <v-icon small style="color: inherit;" class="mr-2"
                    >timer</v-icon
                  >
                  <span>{{ product.formattedExpiry }}</span>
                </v-flex>
                <v-flex>
                  <span>{{ product.orders }} / {{ product.goal }}</span>
                  <span class="grey--text"> backers</span>
                  <v-progress-linear
                    :value="product.progress"
                    :color="product.status.color"
                  ></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text class="text-truncate">
            {{ product.description }}
          </v-card-text>
          <v-card-actions>
            <div class="title">
              <span class="mr-2 font-weight-light">£</span>
              <span class="mr-2">{{ product.price }}</span>
              <span class="subheading">inc. VAT</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :to="{ name: 'product', params: { id: product.id } }"
              >View</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import pluralize from 'pluralize';

export default {
  name: 'Shop',
  data: () => ({
    search: '',
    searchables: ['name', 'description'],
    pageSize: 10,
    sortables: [
      'Expiry date',
      'Date added',
      '% to backed (low–high)',
      '% to backed (high–low)'
    ],
    sortingOn: null
  }),

  computed: {
    ...mapState({
      products: state => state.shop.products,
      loading: state => state.shop.loading
    }),

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
