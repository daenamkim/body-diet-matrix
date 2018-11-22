<template>
  <div id="app">
    <Home v-if="$store.state.view === VIEW_HOME"/>
    <div v-else>
      <Nav :title="$store.state.view" />
      <!-- FIXME: to avoid vue-quaggajs's infinite event callback, using v-show. -->
      <BarCodeReader v-show="$store.state.view === VIEW_BARCODE_READER" />
      <NutritionFacts v-show="$store.state.view === VIEW_NUTRITION" />
      <NoResults v-show="$store.state.view === VIEW_NOT_FOUND" />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Nav from "./components/Nav.vue";
import BarCodeReader from "./components/BarCodeReader.vue";
import NutritionFacts from "./components/NutritionFacts.vue";
import NoResults from "./components/NoResults.vue";
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
    NoResults,
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
