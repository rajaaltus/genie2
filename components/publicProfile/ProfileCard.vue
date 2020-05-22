<template>
  <v-col cols="12" md="3" lg="3">
    <v-card tile elevation="1">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline font-weight-medium">{{
            userProfile.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            userProfile.designation
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div>
        <v-hover>
          <template v-if="userProfile.gender === 'Male'">
            <v-img :src="avatar_url ? avatar_url : '/boy.png'" max-width="100%">
            </v-img>
          </template>
          <template v-else>
            <v-img
              :src="avatar_url ? avatar_url : '/girl.png'"
              max-width="100%"
            >
            </v-img>
          </template>
        </v-hover>
      </div>

      <v-card-text>
        <v-icon small class="mdi mdi-email-outline mr-3"></v-icon>
        <span class="body-2 black-text"> {{ userProfile.personal_email }}</span
        ><br />
        <v-icon small class="mdi mdi-phone mr-3"></v-icon>
        <span class="body-2 text--black">
          {{ userProfile.contact_no }}
        </span>
      </v-card-text>
    </v-card>
    <div class="mt-4">
      <apexchart
        width="100%"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
        <!-- <v-btn x-small color="green"  @click="updateChart">Update!</v-btn> -->
    </div>
  </v-col>
</template>

<script>
export default {
  props: ["userProfile", "publicationTypeCounts"],
  data() {
    return {
      avatar_url: null,
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories: ['Journal Articles', 'Articles', 'Books', 'Book Chapters', 'Monographs', 'Manuals', 'Reports', 'General'],
        },
      },
      series: [
        {
          name: "Publications",
          data: [0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
  },
  async mounted() {
    console.log(this.publicationTypeCounts)
    if (this.userProfile.image) {
      this.avatar_url =
        this.$axios.defaults.baseURL + this.userProfile.image.url;
    }
    this.updateChart();
  },
  methods: {
    updateChart() {
      this.series = [
        {
          data: this.publicationTypeCounts
        }
      ]
      // const max = 90;
      // const min = 20;
      // const newData = this.series[0].data.map(() => {
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      // });
      // const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
      // // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      // this.chartOptions = {
      //   colors: [colors[Math.floor(Math.random() * colors.length)]],
      // };
      // // In the same way, update the series option
      // this.series = [
      //   {
      //     data: newData,
      //   },
      // ];
    },
  },
};
</script>
