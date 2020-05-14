<template>
  <div>
    <v-card tile elevation="1" :color="cardColor" :dark="dark">
      <v-card-title>
        <span
          class="subtitle-1 font-weight-normal d-inline-block text-truncate"
          >{{ department.name }}</span
        >
      </v-card-title>
      <v-card-text v-if="available === 'default'">
        <v-layout align-start justify-start>
          <v-btn fab x-small color="white" class="mr-1" disabled
            ><v-icon color="blue">mdi-file-word</v-icon></v-btn
          >

          <v-btn fab x-small color="white" disabled
            ><v-icon color="blue">mdi-file-word</v-icon></v-btn
          >
        </v-layout>
      </v-card-text>
      <v-card-text v-if="available === 'available'">
        <v-layout align-start justify-start>
          <v-tooltip right color="green">
            <template v-slot:activator="{ on }">
              <v-btn fab x-small color="white" v-on="on" class="mr-1"
                ><v-icon color="blue">mdi-file-word</v-icon></v-btn
              >
            </template>
            <span>Download Faculty Report</span>
          </v-tooltip>
          <v-tooltip right color="green">
            <template v-slot:activator="{ on }">
              <v-btn fab x-small color="white" v-on="on"
                ><v-icon color="blue">mdi-file-word</v-icon></v-btn
              >
            </template>
            <span>Download Student Report</span>
          </v-tooltip>
        </v-layout>
      </v-card-text>
      <v-card-text v-if="available === 'notSubmitted'">
        <v-layout align-start justify-start>
          <v-tooltip right color="red">
            <template v-slot:activator="{ on }">
              <v-btn fab x-small color="white" v-on="on"
                ><v-icon color="blue">mdi-send</v-icon></v-btn
              >
            </template>
            <span>Send Reminder</span>
          </v-tooltip>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ["selectedYear", "department"],
  data() {
    return {
      report: null,
      available: 'notSubmitted',
      cardColor: 'red',
      dark: true,
      availableData: null
    }
  },
  computed: {
    ...mapState({
      availableReports:  state => state.report.availableReports
    })
  },
  
 async mounted() {
    this.setReport();
  },
  methods: {
    async setReport() {
    let queryString = '';
    queryString = `department.id=${this.department.id}&annual_year=${this.selectedYear}`
    await this.$store.dispatch('report/setAvailableReports', {qs: queryString})  
    console.log(this.$store.state.report.availableReports[0])
    if(this.availableReports[0]){
      this.available='available';
      this.cardColor='light-green';
      this.dark=true
    }
  }
  }
  
  
};
</script>
