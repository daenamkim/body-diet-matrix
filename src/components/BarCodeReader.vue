<template>
  <div id="barcodereader">
    <h1>Barcode Reader</h1>
    <quagga-scanner :onDetected="setBarCode" :readerSize="readerSize" :readerType="'ean_reader'"></quagga-scanner>
  </div>
</template>

<script>
/* eslint-disable */

import { QuaggaScanner } from "vue-quaggajs";

export default {
  name: "barcodereader",
  components: {
    QuaggaScanner
  },
  props: {},
  data() {
    return {
      readerSize: {
        width: 640,
        height: 480
      }
    };
  },
  methods: {
    setBarCode: function(barcode) {
      this.$store.dispatch("updateBarCode", barcode);
      alert("Barcode ", barcode, " found");
      console.log("Barcode founf => ", barcode);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#interactive {
  margin: 10px 25%;
  height: 480px;
}
#barcodereader {
  border: 1px solid black;
}
</style>
