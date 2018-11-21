/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barcode: "0",
    productName: "",
    nutritionFacts: []
  },
  mutations: {
    updateNutritionFacts(state, payload) {
      state.productName = payload.productName;
      state.nutritionFacts = payload.nutritionFacts;
    },
    setBarCode(state, barcode) {
      state.barcode = barcode;
    }
  },
  actions: {
    updateNutritionFacts({ commit }, barcode) {
      // TODO: this is dummy data, replace here.
      // TODO: fetch from API and combine with RDA.
      const response = {
        productName: "Yay Cool Drink",
        nutritionFacts: [
          {
            name: "Sugar",
            amount: 44,
            rda: 22
          },
          {
            name: "Sodium",
            amount: 66,
            rda: 22
          },
          {
            name: "Protein",
            amount: 12,
            rda: 22
          }
        ]
      };
      commit("updateNutritionFacts", response);
    }
  },
  updateBarCode({ commit }, barcode) {
    commit("setBarCode", barcode);
    this.actions.updateNutritionFacts(barcode);
  }
});
