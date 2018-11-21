/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import RapidAPI from "rapidapi-connect";
const rapid = new RapidAPI("default-application_5bf4c87fe4b08725af2b08e1", "5359323f-3ab8-450b-9e75-7218fc1c41c7");
const GOOGLE_API_KEY = "AIzaSyA_3qHzgehuRVVfFpfwTNLMsvZhaoEIHzE";
const LANG_JA = "ja";
const LANG_EN = "en";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: LANG_JA,
    barcode: "0",
    productName: "",
    nutritionFacts: []
  },
  mutations: {
    updateNutritionFacts(state, payload) {
      state.productName = payload.productName;
      state.nutritionFacts = payload.nutritionFacts;
    },
    toggleLanguage(state) {
      state.language = state.language === LANG_JA ? LANG_EN : LANG_JA;
    },
    setBarCode(state, barcode) {
      state.barcode = barcode;
    }
  },
  actions: {
    translate({ commit, state }) {
      const nutritionFacts = [...state.nutritionFacts];
      const names = nutritionFacts.map((fact) => fact.name);
      if (!names.length) {
        return;
      }

      rapid.call('GoogleTranslate', 'translate', {
        'string': names,
        'apiKey': GOOGLE_API_KEY,
        'targetLanguage': state.language,
      }).on('success', (payload)=>{
        const newNutritionFacts = nutritionFacts.map((fact, index) => {
          fact.name = payload[index];
          return fact;
        });
        // TODO: why state.nutritionFacts is updated without commit even a new array is created?
        commit("toggleLanguage");
      }).on('error', (payload)=>{
        console.log(payload);
      });
    },
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
