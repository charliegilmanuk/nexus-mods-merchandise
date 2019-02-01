<template>
  <v-container grid-list-xl class="pa-5">
    <v-layout wrap class="py-5">
      <v-flex xs12>
        <v-toolbar flat color="transparent" prominent>
          <v-toolbar-title class="display-1 font-weight-light">
            Products
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            solo
            hide-details
            single-line
            append-icon="search"
            placeholder="Search..."
          ></v-text-field>
          <v-btn v-if="selectedRows.length" color="red">
            Remove {{ selectedRows.length > 1 ? selectedRows.length : '' }}
            {{ pluralize('Product', selectedRows.length) }}
          </v-btn>
          <v-btn color="green">
            Add Product
          </v-btn>
        </v-toolbar>
        <v-data-table
          v-model="selectedRows"
          :headers="headers"
          :items="products"
          item-key="id"
          select-all
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
                color="primary"
              ></v-checkbox>
            </td>
            <td class="text-xs-center shrink">
              <v-avatar size="64">
                <img :src="props.item.image" :alt="props.item.name" />
              </v-avatar>
            </td>
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td
              style="max-width: 200px; white-space: wrap; height: 100px;"
              class="text-truncate wrap"
            >
              {{ props.item.description }}
            </td>
            <td>
              <span class="d-block">{{ props.item.formattedExpiry }}</span>
              <span
                :class="[
                  props.item.expired ? 'red--text' : 'grey--text',
                  'd-block'
                ]"
              >
                {{ props.item.timeLeft }}
              </span>
            </td>
            <td>{{ props.item.orders }} / {{ props.item.goal }}</td>
            <td class="text-xs-right">
              <v-chip label :color="props.item.status.color">{{
                props.item.status.text
              }}</v-chip>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import pluralize from 'pluralize';
import products from '~/data/products';

export default {
  data: () => ({
    search: '',
    selectedRows: [],
    headers: [
      { text: 'Image', value: 'image', sortable: false, align: 'center' },
      { text: 'ID', value: 'id', sortable: true, align: 'center' },
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Description', value: 'id', sortable: false },
      { text: 'Expiry', value: 'expiry', sortable: true },
      { text: 'Backers', value: 'orders', sortable: false },
      { text: 'Status', value: 'status.text', sortable: true, align: 'right' }
    ]
  }),
  computed: {
    products() {
      return products;
    }
  },
  methods: {
    pluralize: pluralize
  }
};
</script>
