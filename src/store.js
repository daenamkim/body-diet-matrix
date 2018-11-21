/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    setBarCode(state, barcode) {
      state.barcode = barcode;
    }
  },
  actions: {
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
      const result = this.state.filter(obj => {
        return obj.barcode === barcode;
      });

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
  }
});
