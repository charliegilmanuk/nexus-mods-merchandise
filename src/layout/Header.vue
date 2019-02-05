<template>
  <div>
    <!-- Top bar, primary navigation -->
    <v-toolbar flat prominent>
      <v-toolbar-title>
        <router-link to="/">
          <img
            :src="require('~/assets/logo.png')"
            alt="Nexus Mods logo"
            style="width: 200px;"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-divider vertical></v-divider>
        <template v-for="nav in mainNav">
          <v-btn :key="nav.text" v-if="nav.to" :to="nav.to">
            {{ nav.text }}
          </v-btn>
          <v-btn :key="nav.text" v-else @click="outOfScope()">
            {{ nav.text }}
          </v-btn>
          <v-divider :key="`${nav.text}-divider`" vertical></v-divider>
        </template>
      </v-toolbar-items>
      <v-btn class="primary light" light>Install Vortex</v-btn>
      <v-toolbar-items>
        <v-divider vertical></v-divider>
        <!-- User dropdown -->
        <v-menu open-on-hover offset-y>
          <v-btn slot="activator">
            <v-avatar class="mr-3">
              <img :src="require('~/assets/avatar.gif')" />
            </v-avatar>
            <span>
              charliegilmanuk
            </span>
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="nav in userNav"
              @click="outOfScope()"
              :key="nav.text"
            >
              <v-list-tile-title>{{ nav.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-divider vertical></v-divider>
        <!-- Mini cart -->
        <v-menu offset-y left :close-on-content-click="false">
          <v-btn slot="activator">
            <v-badge right color="red">
              <span slot="badge" v-if="cartCount">{{ cartCount }}</span>
              <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
          <mini-cart></mini-cart>
        </v-menu>
        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Secondary navigation -->
    <v-toolbar color="grey lighten-1" flat>
      <v-toolbar-items>
        <v-divider vertical light></v-divider>
        <template v-for="nav in secondaryNav">
          <v-menu v-if="nav.children" :key="nav.text" open-on-hover offset-y>
            <v-btn slot="activator" flat light>
              {{ nav.text }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list class="grey" light>
              <template v-for="child in nav.children">
                <v-list-tile @click="outOfScope()" :key="child.text">
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile>
                <v-divider :key="`${child.text}-divider`"></v-divider>
              </template>
            </v-list>
          </v-menu>
          <v-btn v-else :key="nav.text" flat light>{{ nav.text }}</v-btn>
          <v-divider vertical light :key="`${nav.text}-divider`"></v-divider>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field
        light
        solo
        single-line
        hide-actions
        hide-details
        flat
        placeholder="Search..."
        append-icon="search"
      ></v-text-field>
      <v-divider vertical></v-divider>
      <v-select
        v-model="searchSelected"
        :items="searchTypes"
        solo
        light
        flat
        single-line
        multiple
        hide-actions
        hide-details
        :menu-props="{ maxHeight: 350, offsetY: true }"
        class="shrink"
        clearable
      ></v-select>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MiniCart from '~/components/MiniCart';

export default {
  components: {
    'mini-cart': MiniCart
  },
  data: () => ({
    userNav: [{ text: 'Settings' }, { text: 'Sign out' }],
    mainNav: [
      { text: 'Shop Admin', to: { name: 'admin' } },
      { text: 'Shop', to: { name: 'shop' } },
      { text: 'Forums' },
      { text: 'Chat' },
      { text: 'News' }
    ],
    secondaryNav: [
      {
        text: 'Game:',
        children: [
          {
            text: 'Skryim Special Edition',
            image: 'https://placehold.it/400x150'
          }
        ]
      },
      {
        text: 'Mods',
        children: [
          { text: 'Browse all mods' },
          { text: "Today's mods" },
          { text: '...' }
        ]
      },
      {
        text: 'Images',
        children: [
          { text: 'View all images' },
          { text: `Today's images` },
          { text: `New images this week` }
        ]
      },
      {
        text: 'Videos',
        children: [
          { text: 'View all videos' },
          { text: `Today's videos` },
          { text: 'News videos this week' }
        ]
      },
      {
        text: 'Updates'
      },
      {
        text: 'Support',
        children: [
          { text: 'Support forum' },
          { text: 'Wiki' },
          { text: 'Help' },
          { text: 'Contact us' },
          { text: 'Report an issue' }
        ]
      }
    ],
    searchTypes: [
      'Mods',
      'Images',
      'Supporter images',
      'Videos',
      'Authors',
      'Games'
    ],
    searchSelected: ['Mods']
  }),
  computed: {
    ...mapGetters(['cartCount'])
  }
};
</script>
