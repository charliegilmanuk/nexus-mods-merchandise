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
          <v-btn
            v-if="selectedRows.length"
            color="red"
            @click="showDeleteConfirm = true"
          >
            Remove {{ selectedRows.length > 1 ? selectedRows.length : '' }}
            {{ pluralize('Product', selectedRows.length) }}
          </v-btn>
          <v-btn color="green" :to="{ name: 'admin.products.create' }">
            Add Product
          </v-btn>
        </v-toolbar>
        <v-data-table
          v-model="selectedRows"
          :headers="headers"
          :items="products"
          :loading="loading"
          :search="search"
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
              <v-avatar size="64" v-if="props.item.image">
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
            <td>
              <v-chip label :color="props.item.status.color">{{
                props.item.status.text
              }}</v-chip>
            </td>
            <td class="text-xs-right">
              <!-- View button -->
              <v-tooltip top lazy color="black">
                <v-btn
                  slot="activator"
                  icon
                  small
                  :to="{ name: 'product', params: { id: props.item.id } }"
                >
                  <v-icon>search</v-icon>
                </v-btn>
                <span>View in shop</span>
              </v-tooltip>

              <!-- Edit button -->
              <v-tooltip top lazy color="black">
                <v-btn
                  slot="activator"
                  icon
                  small
                  :to="{
                    name: 'admin.products.edit',
                    params: { id: props.item.id }
                  }"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <span>Edit product</span>
              </v-tooltip>

              <!-- Delete button -->
              <v-tooltip top lazy color="black">
                <v-btn
                  icon
                  small
                  slot="activator"
                  @click="confirmDeleteSingle(props.item)"
                >
                  <v-icon small>delete</v-icon>
                </v-btn>
                <span>Remove selected</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showDeleteConfirm" width="500">
      <v-card>
        <v-card-text class="pa-4">
          <p class="ma-0">
            Are you sure you want to remove
            {{ pluralize('this', selectedRows.length) }}
            {{ selectedRows.length }}
            {{ pluralize('product', selectedRows.length) }}?
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="showDeleteConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="red" flat @click="deleteSelected()">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import pluralize from 'pluralize';

export default {
  data: () => ({
    search: '',
    selectedRows: [],
    showDeleteConfirm: false,
    headers: [
      { text: 'Image', value: 'image', sortable: false, align: 'center' },
      { text: 'ID', value: 'id', sortable: true, align: 'center' },
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Description', value: 'id', sortable: false },
      { text: 'Expiry', value: 'expiry', sortable: true },
      { text: 'Backers', value: 'orders', sortable: false },
      { text: 'Status', value: 'status.text', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
    ]
  }),
  computed: {
    ...mapState({
      products: state => state.shop.products,
      loading: state => state.shop.loading
    })
  },
  methods: {
    ...mapActions(['deleteProducts']),

    pluralize: pluralize,

    confirmDeleteSingle(product) {
      this.selectedRows.push(product);
      this.showDeleteConfirm = true;
    },

    deleteSelected() {
      this.deleteProducts(this.selectedRows).then(() => {
        this.selectedRows = [];
        this.showDeleteConfirm = false;
      });
    }
  }
};
</script>
