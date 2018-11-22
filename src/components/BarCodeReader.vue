<template>
  <div class="barcode-reader">
    <!-- TODO: applying a layout to quagga is not working well. -->
    <v-app>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex xs10>
            <quagga-scanner :onDetected="setBarCode" :readerSize="readerSize" :readerType="'ean_reader'"></quagga-scanner>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { QuaggaScanner } from "vue-quaggajs";
import { VIEW_BARCODE_READER } from "../store";

// TODO: it should turn of a camera when this is not using.
export default {
  name: "barcodeReader",
  components: {
    QuaggaScanner
  },
  data: () => ({
    readerSize: {
      width: 640,
      height: 480
    }
  }),
  methods: {
    setBarCode: function(data) {
      // FIXME: to avoid vue-quaggajs's infinite event callback, using v-show.
      if (this.$store.state.view !== VIEW_BARCODE_READER) {
        console.log("Block event callback.");
        return;
      }

      this.$store.dispatch("updateBarCode", data.codeResult.code);
    }
  }
};
</script>

<style scoped>
#interactive {
  /* margin: 10px 25%; */
  /* height: 480px; */
}
</style>
