<template>
  <v-card>
    <template v-if="added.id">
      <v-card-title class="grey darken-4 pt-0">
        <v-alert
          type="success"
          outline
          :value="added.id"
          transition="scale-transition"
          style="width: 100%;"
        >
          {{ pluralize('item', added.quantity) }}
          {{ pluralize('was', added.quantity) }} added to the cart successfully!
        </v-alert>
      </v-card-title>
      <v-card-actions class="grey darken-4 pa-3">
        <v-spacer></v-spacer>
        <v-btn outline :to="{ name: 'shop' }">
          Shop all products
        </v-btn>
        <v-btn color="success" @click="$emit('close')">
          Continue Shopping
        </v-btn>
      </v-card-actions>
    </template>
    <v-toolbar card v-if="cartCount" color="transparent" dense>
      <v-toolbar-title class="subheading">
        Shopping Cart
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <span class="font-weight-light caption grey--text">Total: </span>
        <span class="subheading">£{{ cartTotal }}</span>
      </div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-data-table
        v-if="cartCount"
        :items="cartProducts"
        :headers="headers"
        :loading="loading"
        hide-headers
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center shrink py-3">
            <v-avatar size="32" v-if="props.item.image">
              <img :src="props.item.image" :alt="props.item.name" />
            </v-avatar>
          </td>
          <td>
            {{ props.item.name }}
          </td>
          <td>x{{ props.item.quantity }}</td>
          <td>${{ parseFloat(props.item.price).toFixed(2) }}</td>
          <td class="text-xs-right">
            <v-btn icon @click="removeProduct(props.item)">
              <v-icon small>close</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <template v-else>
        <p class="pa-4 ma-0 subheading">
          You haven't added any products to your cart!
        </p>
      </template>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <template v-if="cartCount">
        <v-btn small flat color="grey">Edit cart</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary">
          Checkout
        </v-btn>
      </template>
      <template v-else>
        <v-btn :to="{ name: 'shop' }" block color="primary">Go shopping</v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import pluralize from 'pluralize';

export default {
  name: 'MiniCart',
  data: () => ({
    headers: [
      { text: 'Image', value: 'image', sortable: false },
      { text: 'Name', value: 'name', sortable: false },
      { text: 'Quantity', value: 'quantity', sortable: false },
      { text: 'Price', value: 'price', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  props: {
    added: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.shop.cartLoading
    }),

    ...mapGetters(['cartCount', 'cartProducts', 'cartTotal'])
  },
  methods: {
    pluralize: pluralize,

    removeProduct(product) {
      this.$store.dispatch('removeFromCart', [product]);
    }
  }
};
</script>
