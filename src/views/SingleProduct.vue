<template>
  <div>
    <v-container>
      <v-layout wrap justify-center class="py-5">
        <v-flex xs12 md5 lg4>
          <v-img :src="product.image" aspect-ratio="1"></v-img>
        </v-flex>
        <v-flex xs12 md7 lg4 offset-lg1>
          <h1 class="font-weight-light display-3 text-uppercase">
            {{ product.name }}
          </h1>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey darken-3">
      <v-layout wrap justify-center class="py-5">
        <v-flex xs12 md10 lg8>
          <v-tabs grow color="transparent" slider-color="primary">
            <v-tab v-for="tab in tabs" :key="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabActive" class="pa-5">
            <v-tab-item :key="Description">
              <h1>Description</h1>
            </v-tab-item>
            <v-tab-item :key="Comments">
              <h1>Comments</h1>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    tabActive: null,
    tabs: ['Description', 'Comments', 'FAQ']
  }),
  computed: {
    ...mapState({
      products: state => state.products.all
    }),

    productId() {
      return this.$route.params.id;
    },

    product() {
      return this.products.find(x => x.id === this.productId);
    }
  }
};
</script>
