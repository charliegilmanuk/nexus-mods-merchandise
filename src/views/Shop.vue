<template>
  <v-container grid-list-xl class="py-5">
    <v-toolbar dense class="transparent pa-0" flat>
      <v-text-field
        v-model="search"
        solo
        single-line
        hide-actions
        hide-details
        placeholder="Search product..."
        append-icon="search"
      ></v-text-field>
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
      <v-combobox
        v-model="sortingOn"
        :items="sortables"
        solo
        single-line
        hide-actions
        hide-details
        label="Sort by"
        class="shrink"
      >
      </v-combobox>
    </v-toolbar>
    <v-layout wrap class="py-5">
      <v-flex
        xs6
        md4
        lg3
        v-for="product in products"
        :key="product.id"
        class="mx-0"
      >
        <v-card flat>
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
          <v-card-title>
            <v-container class="pa-0">
              <v-layout column>
                <v-flex
                  align-center
                  align-content-center
                  justify-center
                  :class="[
                    product.isExpired()
                      ? 'red--text'
                      : 'grey--text text--lighten-1',
                    'subtitle'
                  ]"
                >
                  <v-icon small style="color: inherit;" class="mr-2"
                    >timer</v-icon
                  >
                  <span>{{ product.formattedExpiry() }}</span>
                </v-flex>
                <v-flex>
                  <span>{{ product.orders }} / {{ product.goal }}</span>
                  <span class="grey--text"> backers</span>
                  <v-progress-linear
                    :value="product.progress()"
                    :color="product.status().color"
                  ></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text class="text-truncate">
            {{ product.description }}
          </v-card-text>
          <v-card-actions>
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
import products from '~/data/products';

export default {
  data: () => ({
    search: '',
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
    products() {
      return products;
    }
  }
};
</script>

<style></style>
