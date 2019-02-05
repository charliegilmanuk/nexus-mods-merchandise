<template>
  <v-card flat v-if="product.id">
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
              product.expired ? 'red--text' : 'grey--text text--lighten-1',
              'subtitle'
            ]"
          >
            <v-icon small style="color: inherit;" class="mr-2">
              timer
            </v-icon>
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
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
