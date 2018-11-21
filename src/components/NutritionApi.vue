
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

</template>

<script>
// import Vue from "vue";
// import Vuex from "vuex";
import unirest from "unirest";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    unirest
      .get("https://nutritionix-api.p.rapidapi.com/item?upc=49000036756")
      .header(
        "X-Mashape-Key",
        "krltmsPgUfmsh8D3xNg5RFh035Unp19nowUjsnO22I54TbGKxj"
      )
      .header("X-Mashape-Host", "nutritionix-api.p.rapidapi.com")
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>