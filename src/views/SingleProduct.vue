<template>
  <div v-if="product">
    <v-toolbar flat color="transparent">
      <v-btn flat :to="{ name: 'shop' }">
        <v-icon class="mr-2">chevron_left</v-icon>
        Return to shop
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'admin.products.edit', params: { id } }" flat>
        Edit as Admin
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-layout wrap justify-center class="py-5">
        <v-flex xs12 md5 lg4>
          <v-img :src="product.image" aspect-ratio="1"></v-img>
        </v-flex>
        <v-flex xs12 md7 lg4 offset-lg1>
          <h1 class="font-weight-light display-3 text-uppercase">
            {{ product.name }}
          </h1>
          <h2
            :class="[
              'font-weight-light',
              'subheading',
              { 'red--text': product.expired },
              'mb-5'
            ]"
          >
            <span>{{ product.expired ? 'Expired ' : '' }}</span>
            {{ product.timeLeft }} – {{ product.formattedExpiry }}
          </h2>
          <p
            class="title font-weight-light mb-5"
            v-html="nl2br(product.description.substr(0, 400)) + '...'"
          ></p>

          <span>{{ product.orders }} / {{ product.goal }}</span>
          <span class="grey--text"> backers</span>
          <v-progress-linear
            :value="product.progress"
            :color="product.status.color"
          ></v-progress-linear>

          <v-toolbar flat color="transparent" class="mt-5">
            <span class="title mr-2">£{{ product.price }}</span>
            <span class="subheading">inc. VAT</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model.number="quantity"
              solo
              light
              single-line
              hide-details
              hide-actions
              flat
              type="number"
              min="1"
              max="10"
              class="shrink"
            ></v-text-field>
            <v-btn
              color="success"
              :disabled="product.expired"
              @click="addToCart()"
            >
              Add to cart
            </v-btn>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey darken-3">
      <v-layout wrap justify-center class="py-5">
        <v-flex xs12 md10 lg8>
          <v-tabs
            grow
            color="transparent"
            slider-color="primary"
            v-model="tabActive"
          >
            <v-tab v-for="tab in tabs" :key="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabActive" class="pa-5 subheading">
            <v-tab-item>
              <p v-html="nl2br(product.description)"></p>
            </v-tab-item>
            <v-tab-item>
              <p>
                No comments on this product.
              </p>
            </v-tab-item>
            <v-tab-item>
              <p>
                No FAQs for this product.
              </p>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout wrap justify-center class="py-5">
        <v-flex xs12>
          <span class="headline px-3 py-4 d-block">Related Products</span>
        </v-flex>
        <v-flex
          xs6
          md4
          lg3
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          class="py-4 px-3"
          transition="slide-y-transition"
        >
          <product-card
            :product="relatedProduct"
            @click="$vuetify.goTo('#app')"
          ></product-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="confirmation" width="600">
      <v-toolbar class="grey darken-4" flat>
        <v-spacer></v-spacer>
        <v-btn icon @click="confirmation = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <mini-cart :added="added" @close="confirmation = false"></mini-cart>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import nl2br from 'nl2br';
import MiniCart from '~/components/MiniCart';
import ProductCard from '~/components/ProductCard';

export default {
  name: 'SingleProduct',
  components: {
    'mini-cart': MiniCart,
    'product-card': ProductCard
  },
  data: () => ({
    tabActive: null,
    tabs: ['Description', 'Comments', 'FAQ'],
    quantity: 1,
    confirmation: false,
    added: {}
  }),
  watch: {
    id() {
      this.$vuetify.goTo('#app');
    },

    product() {
      this.appTitle(this.product.name);
    }
  },
  computed: {
    ...mapState({
      products: state => state.shop.products
    }),

    id() {
      return this.$route.params.id;
    },

    product() {
      return this.products.find(x => x.id == this.id);
    },

    relatedProducts() {
      let excluded = [this.id];
      let count = this.products.length <= 5 ? this.products.length - 1 : 4;
      let related = [];

      while (related.length < count) {
        let rand = Math.floor(Math.random() * this.products.length);

        if (excluded.indexOf(rand) < 0) {
          related.push(this.products[rand]);
          excluded.push(rand);
        }
      }

      return related;
    }
  },
  methods: {
    nl2br: nl2br,

    addToCart() {
      if (!this.product.expired) {
        this.added = { id: this.id, quantity: this.quantity };

        this.$store.dispatch('addToCart', this.added).then(() => {
          this.confirmation = true;
        });
      }
    }
  }
};
</script>
