<template>
  <div>
    <YearDialog
      :reportYears="reportYears"
      v-if="$store.state.selectedYear == 0"
    />
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-view-dashboard cust-icon"></span>
        Dashboard
      </v-tab>
      <v-tab>
        <span class="mdi mdi-file-word cust-icon"></span>
        Consolidated Report
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="12" lg="3">
                <v-select
                  :items="reportYears"
                  item-value="id"
                  item-text="val"
                  label="Reporting Year"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="11" lg="3">
                <v-autocomplete
                  v-model="friends"
                  :disabled="isUpdating"
                  :items="people"
                  color="blue-grey lighten-2"
                  label="Faculty / Staff / Student"
                  item-text="name"
                  item-value="name"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      @click="data.select"
                      
                    >
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content
                        v-text="data.item"
                      ></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.group"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="1" lg="1">
                <div class="my-4">
                  <v-btn color="green darken-2" fab x-small dark>
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="blue lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Programmes / Events</h2>
                  <span class="display-2 font-weight-bold">
                    302
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="orange lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Department Visitors</h2>
                  <span class="display-2 font-weight-bold">
                    125
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="green lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Training Underwent</h2>
                  <span class="display-2 font-weight-bold">
                    256
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="red lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Presentations / Posters</h2>
                  <span class="display-2 font-weight-bold">
                    518
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="pink lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Participations</h2>
                  <span class="display-2 font-weight-bold">
                    1369
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="6">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="light-green lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Publications</h2>
                  <span class="display-2 font-weight-bold">
                    845
                  </span>

                  <v-tooltip top color="black">
                    <template v-slot:activator="{ on }">
                      <v-btn class="ml-12" tile x-small color="green darken-3" v-on="on">125</v-btn>
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
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="deep-purple lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Public Engagement</h2>
                  <span class="display-2 font-weight-bold">
                    85
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="teal lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Research Activities</h2>
                  <span class="display-2 font-weight-bold">
                    331
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="purple lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Recognitions</h2>
                  <span class="display-2 font-weight-bold">
                    42
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="lime lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Patents</h2>
                  <span class="display-2 font-weight-bold">
                    8
                  </span>
                </v-alert>
              </v-col>

              <v-col cols="3">
                <v-alert
                  tile
                  elevation="1"
                  border="left"
                  color="amber lighten-1"
                  colored-border
                  icon="mdi-twitter"
                >
                  <h2 class="font-weight-bold">Key Assignments</h2>
                  <span class="display-2 font-weight-bold">
                    25
                  </span>
                </v-alert>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-card class="mx-auto">
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
              </v-col>
              <v-col cols="6">
                <v-card class="mx-auto">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >Research Activities</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <div>
                    <apexchart
                      width="100%"
                      type="line"
                      :options="options"
                      :series="series"
                    ></apexchart>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text class="px-0 py-1">
            <v-row class="px-5">
              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="year"
                  label="Reporting Year"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="fullname"
                  label="Faculty / Staff / Student"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="1" md="1">
                <div class="my-4">
                  <v-btn color="green darken-2" fab x-small dark>
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-expansion-panels flat multiple>
              <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>Item</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import YearDialog from "@/components/YearDialog";
export default {
  head() {
    return {
      title: "Dashboard"
    };
  },
  components: {
    PageHeader,
    YearDialog
  },
  data() {
    const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }
    return {
    reportYears: [
      {
        id: 2017,
        val: "2017-2018"
      },
      {
        id: 2018,
        val: "2018-2019"
      },
      {
        id: 2019,
        val: "2019-2020"
      },
      {
        id: 2020,
        val: "2020-2021"
      }
    ],
    isUpdating: false,
    friends: ['Sandra Adams', 'Britta Holt'],
    people: [
          { header: 'Faculty' },
          { name: 'Sandra Adams', group: 'Faculty', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Faculty', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Faculty', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Faculty', avatar: srcs[2] },
          { divider: true },
          { header: 'Student' },
          { name: 'Britta Holt', group: 'Student', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Student', avatar: srcs[5] },
          { name: 'John Smith', group: 'Student', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Student', avatar: srcs[3] },
        ],
    }
  },
  data: () => ({
    options: {
      chart: {
        id: "vuechart-example"
      },
      theme: {
        palette: "palette3"
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
  }),
  async fetch({ store }) {
    let userId = store.state.auth.user.id;
    await store.dispatch("user/setFullUser", { id: userId });
  },
   watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
    },
};
</script>

<style scoped>
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}

.dboard {
  color: #ffffff;
}
</style>
