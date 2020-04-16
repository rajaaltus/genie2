<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card tile class="mx-auto my-card">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline"
                >Dr Shivaram Valabally</v-list-item-title
              >
              <v-list-item-subtitle
                >Head of the Department</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-img src="/person.png" height="auto"></v-img>

          <v-card-text>
            <v-icon
              small
              color="red"
              class="mdi mdi-email-outline mr-3"
            ></v-icon>
            <span class="body-2">girishnrao@gmail.com</span><br />
            <v-icon small color="blue" class="mdi mdi-phone mr-3"></v-icon>
            <span class="body-2">+91 96865 89658</span>
          </v-card-text>

          <v-card-actions>
            <v-btn x-small color="green darken-3" class="mr-3 white--text">
              Edit
            </v-btn>
            <v-switch color="green darken-3" label="Public Access"></v-switch>
          </v-card-actions>
        </v-card>

        <v-card tile class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline"
                >Publications</v-list-item-title
              >
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
            <span
              >Articles for Professionals in Souvenirs, Newsletters, etc..</span
            >
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
      </v-col>

      <v-col cols="12" md="9" lg="9">
        <v-tabs
          background-color="light-green lighten-5"
          color="green darken-3"
          light
        >
          <v-tab>
            <span class="mdi mdi-face cust-icon"></span>
            My Profile
          </v-tab>
          <v-tab>
            <span class="mdi mdi-account-settings cust-icon"></span>
            Settings
          </v-tab>

          <v-tab-item class="pt-1">
            <!-- Qualification-->
            <v-alert
              tile
              elevation="1"
              border="left"
              color="blue lighten-1"
              colored-border
              icon="mdi-hospital-building"
            >
              <h2 class="font-weight-bold">Qualifications</h2>
              <v-card flat class="py-0">
                <v-card-title class="title font-weight-bold px-0"
                  >1975-79
                </v-card-title>
                <v-card-subtitle class="body-2 font-weight-bold px-0"
                  >MD, MS Ramiya Medical College, Bangalore.
                </v-card-subtitle>
              </v-card>

              <v-card flat class="py-0">
                <v-card-title class="title font-weight-bold px-0"
                  >1970-75
                </v-card-title>
                <v-card-subtitle class="body-2 font-weight-bold px-0"
                  >MBBS, MS Ramiya Medical College, Bangalore.
                </v-card-subtitle>
              </v-card>
              <v-layout align-end justify-end>
                <v-btn color="red lighten-1" fab x-small dark>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-layout>
            </v-alert>
            <!-- Qualification End -->

            <!-- Experiance -->
            <v-alert
              tile
              elevation="1"
              border="left"
              color="amber lighten-1"
              colored-border
              icon="mdi-briefcase"
            >
              <h2 class="font-weight-bold">Experiance</h2>
              <v-timeline dense>
                <v-timeline-item small>
                  <template>
                    <span class="font-weight-bold">1985 - Present</span>
                  </template>
                  <div class="py-4">
                    <h2>
                      Senior Professor
                    </h2>
                    <div>
                      NIMHANS, Bengaluru.
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>

              <v-layout align-end justify-end>
                <v-btn color="red lighten-1" fab x-small dark>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-layout>
            </v-alert>
            <!-- Experiance End -->

            <v-expansion-panels accordion multiple>
              <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>
                  <h2 class="font-weight-bold">
                    <v-icon
                      color="green darken-3"
                      class="mdi mdi-email-outline mr-3"
                    ></v-icon
                    >Qualifications
                  </h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="px-0 py-1"> </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  head() {
    return {
      title: "User Profile"
    };
  },
  components: {
    PageHeader
  },
  data: () => ({
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
  })
};
</script>

<style scoped>
.my-card {
  border-top: 3px solid #7cb342;
}
.cust-icon {
  font-size: 20px;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 12px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
