import Vue from "vue";
import Vuex from "vuex";
import RapidAPI from "rapidapi-connect";
import unirest from "unirest";

const rapid = new RapidAPI(
  "default-application_5bf4c87fe4b08725af2b08e1",
  "5359323f-3ab8-450b-9e75-7218fc1c41c7"
);
const GOOGLE_API_KEY = "AIzaSyA_3qHzgehuRVVfFpfwTNLMsvZhaoEIHzE";

export const LANG_JA = "ja";
export const LANG_EN = "en";
export const VIEW_HOME = "Home";
export const VIEW_BARCODE_READER = "Barcode Reader";
export const VIEW_NOT_FOUND = "Not Found";
export const VIEW_NUTRITION = "Nutrition Facts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    view: VIEW_HOME,
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
    },
    switchView(state, view) {
      state.view = view;
    }
  },
  actions: {
    switchView({ commit }, view) {
      commit("switchView", view);
    },
    translate({ commit, state }) {
      const nutritionFacts = [...state.nutritionFacts];
      const names = nutritionFacts.map(fact => fact.name);
      if (!names.length) {
        return;
      }

      rapid
        .call("GoogleTranslate", "translate", {
          string: names,
          apiKey: GOOGLE_API_KEY,
          targetLanguage: state.language
        })
        .on("success", payload => {
          const newNutritionFacts = nutritionFacts.map((fact, index) => {
            fact.name = payload[index];
            return fact;
          });
          // TODO: why state.nutritionFacts is updated without commit even a new array is created?
          commit("toggleLanguage");
        })
        .on("error", payload => {
          console.log(payload);
        });
    },
    updateBarCode({ commit }, barcode) {
      return new Promise(resolve => {
        commit("setBarCode", barcode);
        unirest
          .get(
            `https://cors-anywhere.herokuapp.com/https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=${barcode}`
          )
          .header(
            "X-Mashape-Key",
            "TZsw5zqqAymshRCEmZxdKKJRHxAGp1dBSInjsnYbVH2iKHL7Ik"
          )
          .header("X-Mashape-Host", "nutritionix-api.p.rapidapi.com")
          .end(result => {
            const response = {
              productName: result.body.item_name, //result.body is an object, item_name is key value
              nutritionFacts: [
                {
                  name: "Sugar",
                  amount: result.body.nf_sugars,
                  rda: 25 //grams
                },
                {
                  name: "Sodium",
                  amount: result.body.nf_sodium,
                  rda: 2000 //milligrams
                },
                {
                  name: "Calories",
                  amount: result.body.nf_calories,
                  rda: 2000
                },
                {
                  name: "Calories From Fat",
                  amount: result.body.nf_calories_from_fat,
                  rda: 500 //500 calories due 25% of 2000
                }
              ]
            };
            if (result.status !== 200) {
              commit("switchView", VIEW_NOT_FOUND);
            } else {
              commit("updateNutritionFacts", response);
              commit("switchView", VIEW_NUTRITION);
            }
            resolve();
          });
      });
    },
    backView({ commit }) {
      switch (this.state.view) {
        case VIEW_BARCODE_READER:
          commit("switchView", VIEW_HOME);
          break;
        case VIEW_NOT_FOUND:
        case VIEW_NUTRITION:
          commit("switchView", VIEW_BARCODE_READER);
          break;
      }
    }
  }
});
