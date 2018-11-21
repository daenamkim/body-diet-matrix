<template>
  <div class="home">
    <div>
      <img src="../assets/logo.png">
    </div>
    <div>
      <button class="start-button" v-on:click="start">Start</button>
    </div>
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
}
</script>

<style scoped>
</style>
