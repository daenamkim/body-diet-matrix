<template>
  <div class="no-results">
    <div class="sorry-not-food">
      Are you sure you want to eat this?
    </div>
    <div class ="sorry-pic">
       <img class = "really" src="../assets/really.png" alt="Really?" />
    </div>
  <div class ="error-msg">
    <p>
      Sorry the item you have scanned is not food or does not reside in our database.
    </p>
    <p>
      Please go back to main page.
    </p>
    
  </div>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "NoResults",
  props: {}
};
</script>

<style scoped>
.no-results {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-block-end: 2em;
  font-size: calc(30px + 2vmin);
}

.sorry-pic {
  font-size: calc(10px + 1vmin);
  height: 95px;
}

.error-msg {
  padding-block-start: 2.5em;
  font-size: calc(10px + 1.5vmin);
}

.really {
  padding-block-start: 1em;
  height: 90px;
  object-fit: contain;
}
</style>
