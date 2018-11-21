/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import RapidAPI from "rapidapi-connect";
const rapid = new RapidAPI("default-application_5bf4c87fe4b08725af2b08e1", "5359323f-3ab8-450b-9e75-7218fc1c41c7");
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
    nutritionFacts: [],
    dummyData: [
      {
        barcode: 9300652800654,
        body: {
          item_name: "Crunchy Peanut Butter",
          nf_calories: 120.86,
          nf_calories_from_fat: 90,
          nf_sodium: 62,
          nf_sugars: 0.9
        }
      },
      {
        barcode: 9300652800647,
        body: {
          item_name: "Peanut Butter, Smooth",
          nf_calories: 125.63,
          nf_calories_from_fat: 95.4,
          nf_sodium: 86,
          nf_sugars: 0.9
        }
      }
    ]
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
    },
  },
  actions: {
    switchView({ commit }, view) {
      commit("switchView", view);
    },
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
      // Can't use below due 401 errors from RapidAPI
      // mounted() {
      //   unirest
      //     .get(
      //       `https://nutritionix-api.p.rapidapi.com/item?upc=${barcode}`
      //     )
      //     .header(
      //       "X-Mashape-Key",
      //       "krltmsPgUfmsh8D3xNg5RFh035Unp19nowUjsnO22I54TbGKxj"
      //     )
      //     .header("X-Mashape-Host", "nutritionix-api.p.rapidapi.com")
      //     .end(function(result) {
      //       //console.log(result.status, result.headers, result.body);
      //     });
      //   }
      const temp = this.state.dummyData.filter(obj => {
        return obj.barcode === barcode;
      });
      const result = temp[0];
      const response = {
        productName: result.body.item_name, //result.body is an object, item_name is key value
        nutritionFacts: [
          {
            name: "Sugar",
            amount: result.body.nf_sugars,
            rda: 22
          },
          {
            name: "Sodium",
            amount: result.body.nf_sodium,
            rda: 22
          },
          {
            name: "Calories",
            amount: result.body.nf_calories,
            rda: 22
          },
          {
            name: "Calories From Fat",
            amount: result.body.nf_calories_from_fat,
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
  },
});
