<template>
  <div class="barcode-reader">
    <v-app>
      <v-container fluid>
        <v-layout justify-center>
          <quagga-scanner :onDetected="setBarCode" :readerSize="readerSize" :readerType="'ean_reader'" />
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { QuaggaScanner } from "vue-quaggajs";

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
    },
    detecting: false,
  }),
  methods: {
    setBarCode: async function(data) {
      if(this.detecting) {
        return;
      }
      this.detecting = true;

      await this.$store.dispatch("updateBarCode", data.codeResult.code);

      this.detecting = false;
    }
  }
};
</script>

<style scoped>
#interactive {
  /* Must be set */
  width: 640px;
  height: 480px;
}
</style>
