<template>
  <div>
    <v-conatainer>
      <YearDialog @set-year="setYear" />
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
            <v-card-text class="px-0 py-2">
              <v-row class="pr-4">
                <v-col cols="12" lg="3">
                  <v-select
                    v-model="selectedYear"
                    :items="reportYears"
                    item-value="id"
                    item-text="val"
                    label="Reporting Year"
                    color="success"
                    outlined
                    @input="reloadData"
                  ></v-select>
                </v-col>

                <v-col cols="11" lg="3">
                  <v-autocomplete
                    v-model="selectedUser"
                    :items="people"
                    color="blue-grey lighten-2"
                    label="Faculty / Staff / Student"
                    item-text="fullname"
                    item-value="id"
                    outlined
                    @input="getUserWise"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        @click="data.select"
                      >
                        <!-- <v-avatar left>
                          <v-img :src="data.item.avatar"></v-img>
                        </v-avatar> -->
                        {{ data.item.fullname }}
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
                          <img :src="data.item.avatar!==null?$axios.defaults.baseURL+data.item.avatar.url:'/avatar-default-icon.png'" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.fullname"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="data.item.userType"
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
                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>

                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="blue lighten-1"
                    colored-border
                    icon="mdi-clipboard-list"
                  >
                    <h2 class="font-weight-bold">Programmes / Events</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(1)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="orange lighten-1"
                    colored-border
                    icon="mdi-certificate-outline"
                  >
                    <h2 class="font-weight-bold">Department Visitors</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(2)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="green lighten-1"
                    colored-border
                    icon="mdi-bike-fast"
                  >
                    <h2 class="font-weight-bold">Training Underwent</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(3)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="red lighten-1"
                    colored-border
                    icon="mdi-billboard"
                  >
                    <h2 class="font-weight-bold">Presentations / Posters</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(4)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="pink lighten-1"
                    colored-border
                    icon="mdi-atom"
                  >
                    <h2 class="font-weight-bold">Participations</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(5)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="6">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="light-green lighten-1"
                    colored-border
                    icon="mdi-bookshelf"
                  >
                    <h2 class="font-weight-bold">Publications</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(8)}}
                    </span>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ml-12"
                          tile
                          x-small
                          color="green darken-3"
                          v-on="on"
                          >125</v-btn
                        >
                      </template>
                      <span>Journal Articles</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-2" v-on="on"
                          >117</v-btn
                        >
                      </template>
                      <span
                        >Articles for Professionals in Souvenirs, Newsletters,
                        etc..</span
                      >
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-1" v-on="on"
                          >26</v-btn
                        >
                      </template>
                      <span>Books</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-1" v-on="on"
                          >85</v-btn
                        >
                      </template>
                      <span>Book Chapters</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-2" v-on="on"
                          >216</v-btn
                        >
                      </template>
                      <span>Monographs</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-3" v-on="on"
                          >47</v-btn
                        >
                      </template>
                      <span>Manuals</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-4" v-on="on"
                          >112</v-btn
                        >
                      </template>
                      <span>Reports</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-5" v-on="on"
                          >8</v-btn
                        >
                      </template>
                      <span>Articles for General Public / IEC Materials</span>
                    </v-tooltip>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="deep-purple lighten-1"
                    colored-border
                    icon="mdi-air-horn"
                  >
                    <h2 class="font-weight-bold">Public Engagement</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(6)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="teal lighten-1"
                    colored-border
                    icon="mdi-book-search"
                  >
                    <h2 class="font-weight-bold">Research Activities</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(7)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="purple lighten-1"
                    colored-border
                    icon="mdi-crown"
                  >
                    <h2 class="font-weight-bold">Recognitions</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(9)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="lime lighten-1"
                    colored-border
                    icon="mdi-book-lock"
                  >
                    <h2 class="font-weight-bold">Patents</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(10)}}
                    </span>
                  </v-alert>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="amber lighten-1"
                    colored-border
                    icon="mdi-ship-wheel"
                  >
                    <h2 class="font-weight-bold">Key Assignments</h2>
                    <span class="display-2 font-weight-bold">
                      {{getActivityCount(11)}}
                    </span>
                  </v-alert>
                </v-col>
              </v-row>

              <!--<v-row>
                <v-col cols="12" lg="6">
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
                <v-col cols="12" lg="6">
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
              </v-row>-->
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <ReportPreview />
        </v-tab-item>
      </v-tabs>
    </v-conatainer>
  </div>
</template>

<script>

import PageHeader from "@/components/PageHeader";
import YearDialog from "@/components/YearDialog";
import ReportPreview from "@/components/ReportPreview"
export default {
  head() {
    return {
      title: "Dashboard"
    };
  },
  components: {
    PageHeader,
    YearDialog,
    ReportPreview
  },
  data() {
    
    return {
      loading: false,
      selectedUser: null,
      selectedYear: 0,
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
      donutSeries: [20, 20, 20, 20, 20],
      
    };
  },
  computed: {
    people() {
      return this.$store.state.user.activeUsersList.result
    }
  },
  async fetch({ store }) {
    let queryString = "";
    if (store.state.auth.user.userType === "DEPARTMENT")
      queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
    else
      queryString = `department.id=${store.state.auth.user.department}&user.id=${store.state.auth.user.id}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
    await store.dispatch("program/countProgrammes", { qs: queryString });
    await store.dispatch("visitor/countVisitors", { qs: queryString });
    await store.dispatch("training/countTrainings", { qs: queryString });
    await store.dispatch("presentation/countPresentations", { qs: queryString });
    await store.dispatch("participation/countParticipations", { qs: queryString });
    await store.dispatch("public/countPublicEngagements", { qs: queryString });
    await store.dispatch("research/countResearch", { qs: queryString });
    await store.dispatch("publication/countPublications", { qs: queryString });
    await store.dispatch("recognition/countRecognitions", { qs: queryString });
    await store.dispatch("patent/countPatents", { qs: queryString });
    await store.dispatch("assignment/countAssignments", { qs: queryString });

    let queryString1 = '';
    queryString1 = `department.id=${store.state.auth.user.department}&blocked_ne=true`;
    await store.dispatch("user/setActiveUsersList", {qs: queryString1})
    
  },
  watch: {
    selectedYear(val) {
      this.annualYear = this.selectedYear;
      this.reloadData();
    }
  },
  mounted () {
    if (this.selectedYear == 0)
      this.selectedYear = this.$store.state.selectedYear;
  },
  methods: {
    async getUserWise() {
      this.loading = true;
      let queryString = '';
      queryString = `department.id=${this.$auth.user.department}&user.id=${this.selectedUser}&deleted_ne=true&annual_year=${this.selectedYear}`
      await this.$store.dispatch("program/countProgrammes", { qs: queryString });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", { qs: queryString });
      await this.$store.dispatch("presentation/countPresentations", { qs: queryString });
      await this.$store.dispatch("participation/countParticipations", { qs: queryString });
      await this.$store.dispatch("public/countPublicEngagements", { qs: queryString });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", { qs: queryString });
      await this.$store.dispatch("recognition/countRecognitions", { qs: queryString });
      await this.$store.dispatch("patent/countPatents", { qs: queryString })
      await this.$store.dispatch("assignment/countAssignments", { qs: queryString })
      this.loading = false;
    },
    getActivityCount(id) {
      if (id == 1) {
        return this.$store.state.program.programmesCount;
      }
      if (id == 2) {
        return this.$store.state.visitor.visitorsCount;
      }
      if (id == 3) {
        return this.$store.state.training.trainingsCount;
      }
      if (id == 4) {
        return this.$store.state.presentation.presentationsCount;
      }
      if (id == 5) {
        return this.$store.state.participation.participationsCount;
      }
      if (id == 6) {
        return this.$store.state.public.publicEngagementsCount;
      }
      if (id == 7) {
        return this.$store.state.research.researchCount;
      }
      if (id == 8) {
        return this.$store.state.publication.publicationsCount;
      }
      if (id == 9) {
        return this.$store.state.recognition.recognitionsCount;
      }
      if (id == 10) {
        return this.$store.state.patent.patentsCount;
      }
      if (id == 11) {
        return this.$store.state.assignment.assignmentsCount;
      }
      
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";
      // if (this.$store.state.auth.user.userType === "DEPARTMENT")
      //   queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.selectedYear}`;
      // else
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.selectedYear}`;
      await this.$store.dispatch("program/countProgrammes", { qs: queryString });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", { qs: queryString });
      await this.$store.dispatch("presentation/countPresentations", { qs: queryString });
      await this.$store.dispatch("participation/countParticipations", { qs: queryString });
      await this.$store.dispatch("public/countPublicEngagements", { qs: queryString });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", { qs: queryString });
      await this.$store.dispatch("recognition/countRecognitions", { qs: queryString });
      await this.$store.dispatch("patent/countPatents", { qs: queryString })
      await this.$store.dispatch("assignment/countAssignments", { qs: queryString })
      this.loading = false;
    },
   setYear() {
      console.log('receiving....')
      this.selectedYear = this.$store.state.selectedYear
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    
  }
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
