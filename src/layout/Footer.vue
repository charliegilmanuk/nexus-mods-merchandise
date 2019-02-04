<template>
  <v-toolbar color="dark">
    <v-toolbar-title>
      <router-link to="/">
        <img
          :src="require('~/assets/logo.png')"
          alt="Nexus Mods logo"
          style="width: 120px;"
        />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <p class="pa-3 ma-0 grey--text">
      Nexus Mods shop concept by Charlie Gilman
    </p>
    <v-spacer></v-spacer>
    <v-btn color="primary">Back to top</v-btn>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style></style>
