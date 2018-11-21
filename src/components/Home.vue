<template>
  <div class="home">
    <v-app>
      <v-toolbar-title>Body Diet Matrix</v-toolbar-title>
      <v-container fluid>
        <v-layout justify-space-around>
          <v-flex sm5 xs10>
            <v-layout column>
              <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
            </v-layout>
          </v-flex>
        </v-layout>
        <div>
          <v-btn class="start-button" color="info" v-on:click="start">Start</v-btn>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { VIEW_BARCODE_READER } from "../store";

export default {
  name: "Home",
  methods: {
    start() {
      this.$store.dispatch("switchView", VIEW_BARCODE_READER);
    }
  },
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    items: [
      { icon: 'bubble_chart', title: 'Inspire' }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Vuetify.js'
  }),
}
</script>

<style scoped>
.home {
  margin: 0;
}

.start-button {
  margin-top: 30px;
}
</style>
