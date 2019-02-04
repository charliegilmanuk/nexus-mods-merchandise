<template>
  <v-dialog transition="dialog-bottom-transition" width="750" v-model="show">
    <v-card>
      <v-toolbar card color="transparent" tabs>
        <v-toolbar-title>{{ exists ? 'Edit' : 'Add' }} Product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-tabs v-model="tab" slot="extension" slider-color="primary">
          <v-tab ripple>Details</v-tab>
          <v-tab ripple>Image</v-tab>
        </v-tabs>
      </v-toolbar>
      <v-divider></v-divider>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Product name"
                      v-model="product.name"
                    ></v-text-field>
                    <v-textarea
                      label="Product description"
                      v-model="product.description"
                      rows="5"
                    ></v-textarea>
                    <!-- Ideally should be datetime picker, text field due to time constraints -->
                    <v-text-field
                      v-model="product.expiry"
                      label="Expiry date/time"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="product.orders"
                      type="number"
                      label="Backers"
                      min="0"
                      step="100"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="product.goal"
                      type="number"
                      label="Goal"
                      min="0"
                      step="100"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container grid-list-xl>
                <v-layout row wrap justify-center>
                  <v-flex xs10 md8 lg6>
                    <v-img :src="product.image" aspect-ratio="1"></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Image Source (URL)"
                      v-model.lazy="product.image"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="close()">Cancel</v-btn>
          <v-btn type="submit" flat>{{ exists ? 'Save' : 'Add' }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data: () => ({
    show: true,
    tab: null,
    product: {
      id: null,
      name: '',
      description: '',
      image: 'https://placehold.it/500x500',
      expiry: moment().format('YYYY-MM-DD HH:mm:ss'),
      orders: 0,
      goal: 1000
    }
  }),
  computed: {
    ...mapState({
      products: state => state.shop.products
    }),

    exists() {
      return this.id;
    },

    id() {
      return this.$route.params.id;
    },

    reactiveProduct() {
      return this.products.find(x => x.id == this.id);
    }
  },
  watch: {
    show(val) {
      if (!val) this.goBack();
    }
  },
  methods: {
    ...mapActions(['addProduct', 'updateProduct', 'getProducts']),

    close() {
      this.show = false;
    },

    goBack() {
      this.$router.push({ name: 'admin.products' });
    },

    submit() {
      if (this.exists) {
        this.updateProduct(this.product).then(this.close());
      } else {
        this.addProduct(this.product).then(this.close());
      }
    }
  },
  mounted() {
    if (this.exists) {
      this.getProducts().then(() => {
        this.product = JSON.parse(JSON.stringify(this.reactiveProduct));
      });
    }
  }
};
</script>
