<template>
  <div class="nav-bar">
    <div>
      <button v-on:click="back">Back</button>
    </div>
    <div>
      <h3>{{title}}</h3>
    </div>
    <div>
      <button
        v-if="$store.state.view !== VIEW_BARCODE_READER"
        v-on:click="home">
        Home
      </button>
    </div>
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
h3 {
  font-size: 45px;
}

.nav-bar {
  line-height: 100px;
  background-color: lightblue;
  display: flex;
  justify-content: space-around;
}
</style>
