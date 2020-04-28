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
              v-if="$auth.user.userType === 'DEPARTMENT'"
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
              <v-btn
                to="/admin/reports"
                color="red lighten-1"
                small
                dark
                class="my-4"
              >
                <v-icon small class="px-1">mdi-file-pdf</v-icon>
                Download Report
              </v-btn>
            </v-layout>
          </v-col>
          <v-col cols="12" lg="2">
            <v-layout align-end justify-end>
              <v-btn
                @click="all"
                fab
                x-small
                class="mr-2 my-4"
                color="grey lighten-4"
              >
                <v-icon>mdi-arrow-expand-all</v-icon>
              </v-btn>
              <v-btn
                class="mr-2 my-4"
                fab
                x-small
                color="grey lighten-4"
                @click="none"
              >
                <v-icon>mdi-arrow-collapse-all</v-icon>
              </v-btn>
            </v-layout>
          </v-col>
        </v-row>
        <!-- <pre>{{allActivities}}</pre> -->
        <v-expansion-panels flat multiple v-model="panel">
          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(1)"
              ><h3>Programmes / Events</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Program :programmes="programmes" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(2)"
              ><h3>Visitors to the Department</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Visitor :visitors="visitors" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(3)"
              ><h3>Trainings</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Training :trainings="trainings" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(4)"
              ><h3>Presentations / Posters</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Presentation :presentations="presentations" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(5)"
              ><h3>Participations</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Participation :participations="participations" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(6)"
              ><h3>Public Engagements</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <PublicEngagement :publics="publics" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(7)"
              ><h3>Research Activities</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Research :researchData="researchData" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(8)"
              ><h3>Publications</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Publication :publications="publications" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        
          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(9)"
              ><h3>Recognitions</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Recognition :recognitions="recognitions" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(10)"
              ><h3>Patents</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Patent :patents="patents" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(11)"
              ><h3>Key Assignments</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Assignment :assignments="assignments" />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="$auth.user.userType!=='FACULTY'">
            <v-skeleton-loader v-if="loading" height="50" type="list-item">
            </v-skeleton-loader>
            <v-expansion-panel-header v-else ripple @click="getDataById(12)"
              ><h3>Theses / Dissertions</h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Theses :theses="theses" />
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Program from "@/components/ReportPreview/Program";
import Visitor from "@/components/ReportPreview/Visitor";
import Training from "@/components/ReportPreview/Training";
import Presentation from "@/components/ReportPreview/Presentation";
import Participation from "@/components/ReportPreview/Participation";
import PublicEngagement from "@/components/ReportPreview/PublicEngagement";
import Publication from "@/components/ReportPreview/Publication";
import Research from "@/components/ReportPreview/Research";
import Recognition from "@/components/ReportPreview/Recognition";
import Patent from "@/components/ReportPreview/Patent";
import Assignment from "@/components/ReportPreview/Assignment";
import Theses from "@/components/ReportPreview/Theses";

export default {
  components: {
    Program,
    Visitor,
    Training,
    Presentation,
    Participation,
    PublicEngagement,
    Publication,
    Research,
    Recognition,
    Patent,
    Assignment,
    Theses
  },
  data() {
    return {
      loading: false,
      selectedUser: null,
      selectedYear: 0,
      panel: []
    };
  },
  computed: {
    programmes() {
      return this.$store.state.program.programmesData.result;
    },
    visitors() {
      return this.$store.state.visitor.visitorsData.result;
    },
    trainings() {
      return this.$store.state.training.trainingsData.result;
    },
    presentations() {
      return this.$store.state.presentation.presentationsData.result;
    },
    participations() {
      return this.$store.state.participation.participationsData.result;
    },
    publics() {
      return this.$store.state.public.publicData.result;
    },
    publications() {
      return this.$store.state.publication.publicationsData.result;
    },
    researchData() {
      return this.$store.state.research.researchData.result;
    },
    recognitions() {
      return this.$store.state.recognition.recognitionsData.result;
    },
    patents() {
      return this.$store.state.patent.patentsData.result;
    },
    assignments() {
      return this.$store.state.assignment.assignmentsData.result;
    },
    theses() {
      return this.$store.state.theses.thesesData.result;
    },
    reportYears() {
      return this.$store.state.reportYears;
    },
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
    if (this.selectedUser === null) this.selectedUser = this.$auth.user.id;

    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })

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
    },
    getDataById(id) {
      this.loading = true;
      this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${this.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
      if (id == 1) {
        
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
