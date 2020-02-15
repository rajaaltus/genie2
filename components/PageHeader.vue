<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="4" lg="3" class="mt-2">
      <span class="theme-border"><h1 class="headline ml-3">{{ title }}</h1></span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" sm="4" lg="3" v-if="reportYears">
        <v-select
          v-model="$store.state.selectedYear"
          :items="reportYears"
          item-text="val"
          item-value="id"
          label="Reporing Year"
          required
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'reportYears']
}
</script>

<style>
.theme-border {
  border-left: 5px #8BC34A solid;
  float: left;
  margin-left: 0;
}

</style>