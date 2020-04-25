<template>
  <div>
    <v-card tile>
      <v-card-text class="px-0 py-1">
        <v-row class="px-5">
          <v-col cols="12" lg="3">
            <v-select
              v-model="selectedYear"
              :items="reportYears"
              item-value="id"
              item-text="val"
              label="Reporting Year"
              color="success"
              @input="fetchAllData"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="3">
            <v-autocomplete
              v-model="selectedUser"
              :items="people"
              color="blue-grey lighten-2"
              label="Faculty / Staff / Student"
              item-text="fullname"
              item-value="id"
              @input="fetchAllData"
            >
              <template v-slot:selection="data">
                {{ data.item.fullname }}
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img
                      :src="
                        data.item.avatar !== null
                          ? $axios.defaults.baseURL + data.item.avatar.url
                          : '/avatar-default-icon.png'
                      "
                    />
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
          <v-col cols="3" md="3" lg="3">
          <v-layout align-end justify-end>
            <v-btn color="red lighten-1" small dark class="my-4">
              <v-icon small class="px-1">mdi-file-pdf</v-icon>
              Download Report
            </v-btn>
          </v-layout>
          </v-col>
          <v-col cols="12" lg="2">
          <v-layout align-end justify-end>
              <v-btn @click="all" fab x-small class="mr-2 my-4" color="grey lighten-4">
              <v-icon>mdi-arrow-expand-all</v-icon>
              </v-btn
              >
              <v-btn class="mr-2 my-4" fab x-small color="grey lighten-4" @click="none">
                <v-icon>mdi-arrow-collapse-all</v-icon>
              </v-btn>
          </v-layout>
          </v-col>
        </v-row>
        <!-- <pre>{{allActivities}}</pre> -->
        <v-expansion-panels flat multiple v-model="panel">
          <v-expansion-panel v-for="(activity, i) in allActivities" :key="i">
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header
              v-else
              ripple
              @click="getDataById(activity.id)"
              ><h3>{{ activity.title }}</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <pre>{{ setDataById(activity.id) }}</pre>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
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
      panel: []
    };
  },
  computed: {
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    allActivities() {
      return this.$store.getters.approvalActivities;
    },
    activityLength() {
      return this.$store.getters.approvalActivities.length;
    }
  },
  mounted() {
    if (this.selectedYear == 0)
      this.selectedYear = this.$store.state.selectedYear;
    if (this.selectedUser === null)
      this.selectedUser = this.$auth.user.id;
  },
  methods: {
    all() {
      this.panel = [...Array(this.activityLength).keys()].map((k, i) => i);
      this.fetchAllData();
    },
    none() {
      this.panel = [];
    },
    fetchAllData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.selectedUser}&annual_year=${this.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
      this.$store.dispatch("program/setProgrammesData", { qs: queryString });
      this.$store.dispatch("visitor/setVisitorsData", { qs: queryString });
      this.$store.dispatch("training/setTrainingsData", { qs: queryString });
      this.$store.dispatch("presentation/setPresentationsData", {
        qs: queryString
      });
      this.$store.dispatch("participation/setParticipationsData", {
        qs: queryString
      });
      this.$store.dispatch("public/setPublicData", { qs: queryString });
      this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString
      });
      this.$store.dispatch("research/setResearchData", { qs: queryString });
      this.$store.dispatch("recognition/setRecognitionsData", {
        qs: queryString
      });
      this.$store.dispatch("patent/setPatentsData", { qs: queryString });
      this.$store.dispatch("assignment/setAssignmentsData", {
        qs: queryString
      });
      this.$store.dispatch("theses/setThesesData", { qs: queryString });
      this.loading = false;
      return this.$store.state.program.programmesData.result;
      return this.$store.state.visitor.visitorsData.result;
      return this.$store.state.training.trainingsData.result;
      return this.$store.state.presentation.presentationsData.result;
      return this.$store.state.participation.participationsData.result;
      return this.$store.state.public.publicData.result;
      return this.$store.state.research.researchData.result;
      return this.$store.state.publication.publicationsData.result;
      return this.$store.state.recognition.recognitionsData.result;
      return this.$store.state.patent.patentsData.result;
      return this.$store.state.assignment.assignmentsData.result;
      return this.$store.state.theses.thesesData.result;
      
    },
    getDataById(id) {
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${this.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
      if (id == 1) {
        this.loading = true;
        this.$store.dispatch("program/setProgrammesData", { qs: queryString });
        this.loading = false;
      }
      if (id == 2) {
        this.loading = true;
        this.$store.dispatch("visitor/setVisitorsData", { qs: queryString });
        this.loading = false;
      }
      if (id == 3) {
        this.loading = true;
        this.$store.dispatch("training/setTrainingsData", { qs: queryString });
        this.loading = false;
      }
      if (id == 4) {
        this.loading = true;
        this.$store.dispatch("presentation/setPresentationsData", {
          qs: queryString
        });
        this.loading = false;
      }
      if (id == 5) {
        this.loading = true;
        this.$store.dispatch("participation/setParticipationsData", {
          qs: queryString
        });
        this.loading = false;
      }
      if (id == 6) {
        this.loading = true;
        this.$store.dispatch("public/setPublicData", { qs: queryString });
        this.loading = false;
      }
      if (id == 7) {
        this.loading = true;
        this.$store.dispatch("research/setResearchData", { qs: queryString });
        this.loading = false;
      }
      if (id == 8) {
        this.loading = true;
        this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString
        });
        this.loading = false;
      }
      if (id == 9) {
        this.loading = true;
        this.$store.dispatch("recognition/setRecognitionsData", {
          qs: queryString
        });
        this.loading = false;
      }
      if (id == 10) {
        this.loading = true;
        this.$store.dispatch("patent/setPatentsData", { qs: queryString });
        this.loading = false;
      }
      if (id == 11) {
        this.loading = true;
        this.$store.dispatch("assignment/setAssignmentsData", {
          qs: queryString
        });
        this.loading = false;
      }
      if (id == 12) {
        this.loading = true;
        this.$store.dispatch("theses/setThesesData", { qs: queryString });
        this.loading = false;
      }
    },
    setDataById(id) {
      if (id == 1) {
        return this.$store.state.program.programmesData.result;
      }
      if (id == 2) {
        return this.$store.state.visitor.visitorsData.result;
      }
      if (id == 3) {
        return this.$store.state.training.trainingsData.result;
      }
      if (id == 4) {
        return this.$store.state.presentation.presentationsData.result;
      }
      if (id == 5) {
        return this.$store.state.participation.participationsData.result;
      }
      if (id == 6) {
        return this.$store.state.public.publicData.result;
      }
      if (id == 7) {
        return this.$store.state.research.researchData.result;
      }
      if (id == 8) {
        return this.$store.state.publication.publicationsData.result;
      }
      if (id == 9) {
        return this.$store.state.recognition.recognitionsData.result;
      }
      if (id == 10) {
        return this.$store.state.patent.patentsData.result;
      }
      if (id == 11) {
        return this.$store.state.assignment.assignmentsData.result;
      }
      if (id == 12) {
        return this.$store.state.theses.thesesData.result;
      }
    },
    async getUserWise() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$auth.user.department}&user.id=${this.selectedUser}&deleted_ne=true&annual_year=${this.selectedYear}`;
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString
      });
      this.loading = false;
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";
      if (this.$store.state.auth.user.userType === "DEPARTMENT")
        queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.selectedYear}`;
      else
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.selectedYear}`;
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString
      });
      this.loading = false;
    }
  }
};
</script>
