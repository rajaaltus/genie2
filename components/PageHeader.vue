<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9" sm="4" lg="9" class="mt-2 pb-0 px-0">
      <span class="theme-border"><h1 class="ml-3">{{ title }}</h1></span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3" sm="4" lg="3" v-if="reportYears">
        <v-select
          filled
          color="green"
          v-model="selectedYear"
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
export default {
  props: ['title', 'reportYears', 'selectedYear'],
  
  methods: {
    async changeReportingYear () {
			await this.$store.dispatch('setReportingYear', this.selectedYear)
		}
  }
}

</script>

<style>
.theme-border {
  padding: 5px 10px;
  border-left: 5px #e16949 solid;
  float: left;
  margin-left: 0;
}

</style>