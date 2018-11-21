<template>
  <div class="barcode-reader">
    <quagga-scanner :onDetected="setBarCode" :readerSize="readerSize" :readerType="'ean_reader'"></quagga-scanner>
  </div>
</template>

<script>
/* eslint-disable */
import { QuaggaScanner } from "vue-quaggajs";

// TODO: it should turn of a camera when this is not using.
export default {
  name: "barcodeReader",
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

<style scoped>
#interactive {
  margin: 10px 25%;
  height: 480px;
}

.barcode-reader {
  background-color: lightgreen;
}
</style>
