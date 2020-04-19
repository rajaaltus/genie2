<template>
  <div>
    <v-card tile class="mx-auto mt-2">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Publications</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div id="vuechart-example">
        <client-only>
          <apexchart
            width="100%"
            type="bar"
            :options="options"
            :series="series"
          ></apexchart>
        </client-only>
      </div>
    </v-card>

    <v-alert tile elevation="1" color="light-green lighten-5">
      <span class="display-2 font-weight-bold">
        845
      </span>
      <br />

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-3" v-on="on">125</v-btn>
        </template>
        <span>Journal Articles</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-2" v-on="on">117</v-btn>
        </template>
        <span>Articles for Professionals in Souvenirs, Newsletters, etc..</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-1" v-on="on">26</v-btn>
        </template>
        <span>Books</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-1" v-on="on">85</v-btn>
        </template>
        <span>Book Chapters</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-2" v-on="on">216</v-btn>
        </template>
        <span>Monographs</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-3" v-on="on">47</v-btn>
        </template>
        <span>Manuals</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-4" v-on="on">112</v-btn>
        </template>
        <span>Reports</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-5" v-on="on">8</v-btn>
        </template>
        <span>Articles for General Public / IEC Materials</span>
      </v-tooltip>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
      chart: {
        id: "vuechart-example"
      },
      theme: {
        palette: "palette5"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "Publications",
        data: [60, 10, 35, 50, 12, 60, 70, 91]
      }
    ],
    donutSeries: [20, 20, 20, 20, 20]
    }
  }
}
</script>
