<template>
  <div class="nutrition-facts">
    <h3 class="product-name">
      {{$store.state.productName}}
    </h3>
    <div class="facts">
      <table>
        <thead>
          <th>Fact</th>
          <th>Amount</th>
          <th>RDA</th>
        </thead>
        <tbody>
          <tr v-for="fact in $store.state.nutritionFacts" v-bind:key="fact.name">
            <td>{{fact.name}}</td>
            <td v-if="fact.amount > fact.rda" class="warning">{{fact.amount}}</td>
            <td v-if="fact.amount <= fact.rda" class="normal">{{fact.amount}}</td>
            <td>{{fact.rda}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="translate-button">
      <button v-on:click="translate">{{buttonTitles[$store.state.language]}}</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "NutritionFacts",
  props: {},
  data: () => ({
    buttonTitles: {
      "ja": "Translate Facts To Japanese",
      "en": "Translate Facts To English"
    },
  }),
  methods: {
    translate() {
      this.$store.dispatch("translate");
    },
  },
  mounted() {
    this.$store.dispatch("updateNutritionFacts", this.$store.state.barcode);
  },
};
</script>

<style scoped>
.nutrition-facts {
  text-align: center;
}

.product-name {
  margin: 40px 0 0;
}

table {
  border-spacing: 5px;
  margin: 0 auto;
}

th {
  font-weight: bold;
  background-color: lightseagreen;
  width: 100px;
  padding: 10px;
}

td {
  padding: 10px;
}

td:nth-child(1) {
  font-weight: bold;
  background-color: lightskyblue;
}

.normal {
  background-color: lightgreen;
}

.warning {
  background-color: lightcoral;
}
</style>
