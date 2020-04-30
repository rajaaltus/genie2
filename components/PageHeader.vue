<template>
  <v-container fluid>
    <YearDialog @set-year="setYear" />
    <v-row>
      <v-col cols="12" md="9" sm="4" lg="9" class="mt-2 pb-0 px-0">
        <span class="theme-border"
          ><h1 class="ml-3">{{ title }}</h1></span
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3" sm="4" lg="3" v-if="reportYears">
        <v-select
          filled
          color="green"
          v-model="selectedYear"
          :value="selectedYear"
          :items="reportYears"
          item-text="val"
          item-value="id"
          label="Reporting Year"
          required
          
          @input="changeReportingYear"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import YearDialog from '@/components/YearDialog'
import Swal from 'sweetalert2'
export default {
  props: ["title", "reportYears"],
  components: {
    YearDialog
  },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState(["selectedYear"])
  },
  mounted () {
    this.selectedYear = this.$store.state.selectedYear
  },
  methods: {
    changeReportingYear() {
      console.log(this.selectedYear)
      this.$store.dispatch("setReportingYear", this.selectedYear);
      console.log('From store: '+ this.$store.state.selectedYear)
    },
    setYear() {
      console.log('receiving....')
      this.selectedYear = this.$store.state.selectedYear
    }
  }
};
</script>

<style>
.theme-border {
  padding: 5px 10px;
  border-left: 5px #e16949 solid;
  float: left;
  margin-left: 0;
}
</style>
