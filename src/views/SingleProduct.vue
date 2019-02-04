<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-btn flat :to="{ name: 'shop' }">
        <v-icon class="mr-2">chevron_left</v-icon>
        Return to shop
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'admin.products.edit', params: { id: product.id } }"
        flat
      >
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
            <span>{{ product.expired ? 'Expired ' : 'Expiring ' }}</span>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import nl2br from 'nl2br';

export default {
  data: () => ({
    tabActive: null,
    tabs: ['Description', 'Comments', 'FAQ']
  }),
  computed: {
    ...mapState({
      products: state => state.products.all
    }),

    id() {
      return this.$route.params.id;
    },

    product() {
      return this.products.find(x => x.id === this.id);
    }
  },
  methods: {
    nl2br: nl2br
  }
};
</script>
