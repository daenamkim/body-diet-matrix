<template>
  <div class="nav-bar">
    <v-app>
      <v-toolbar fixed>
        <v-btn flat v-on:click="back">
          <v-icon dart left>arrow_back</v-icon>
          Back
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
    </v-app>
  </div>
</template>

<script>
import { VIEW_HOME, VIEW_BARCODE_READER } from "../store";

export default {
  name: "Nav",
  props: {
    title: String,
  },
  data: () => ({
    VIEW_BARCODE_READER,
  }),
  methods: {
    back() {
      this.$store.dispatch("backView");
    },
    home() {
      this.$store.dispatch("switchView", VIEW_HOME);
    }
  }
};
</script>

<style scoped>
.nav-bar {
  height: 64px;
}
</style>
