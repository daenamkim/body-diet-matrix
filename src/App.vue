<template>
  <div id="app">
    <Home v-if="$store.state.view === VIEW_HOME"/>
    <div v-else>
      <Nav :title="$store.state.view" />
      <BarCodeReader v-if="$store.state.view === VIEW_BARCODE_READER" />
      <!-- TODO: not found -->
      <NutritionFacts v-else-if="$store.state.view === VIEW_NUTRITION" />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Nav from "./components/Nav.vue";
import BarCodeReader from "./components/BarCodeReader.vue";
// TODO: not found
import NutritionFacts from "./components/NutritionFacts.vue";
import { VIEW_HOME, VIEW_NOT_FOUND, VIEW_BARCODE_READER, VIEW_NUTRITION } from "./store";

export default {
  name: "app",
  data: () => ({
    VIEW_HOME,
    VIEW_NOT_FOUND,
    VIEW_BARCODE_READER,
    VIEW_NUTRITION
  }),
  components: {
    Home,
    Nav,
    BarCodeReader,
    NutritionFacts,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafafa;
}
</style>
