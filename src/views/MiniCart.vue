<template>
  <v-card>
    <v-toolbar card v-if="cartCount" color="transparent" dense>
      <v-toolbar-title class="subheading">
        Shopping Cart
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <span class="font-weight-light caption grey--text">Total: </span>
        <span class="subheading">£19.65</span>
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
          <td>
            £10.95
          </td>
          <td class="text-xs-right">
            <v-btn icon>
              <v-icon small>close</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
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
        <v-btn :to="{ name: 'shop' }" block color="primary"></v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data: () => ({
    headers: [
      { text: 'Image', value: 'image', sortable: false },
      { text: 'Name', value: 'name', sortable: false },
      { text: 'Quantity', value: 'quantity', sortable: false },
      { text: 'Price', value: 'price', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      loading: state => state.shop.cartLoading
    }),

    ...mapGetters(['cartCount', 'cartProducts'])
  }
};
</script>
