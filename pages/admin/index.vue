<template>
  <div>
    <v-container fluid>
      <YearDialog />
      <v-tabs flat background-color="#323232" color="#6ac447" dark>
        <v-tab>
          <span class="mdi mdi-view-dashboard cust-icon"></span>
          Dashboard
        </v-tab>
        <v-tab>
          <span class="mdi mdi-file-word cust-icon"></span>
          Reports
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="px-0 py-2">
              <v-row class="pr-4">
                <v-col cols="12" lg="2" class="my-5">
                  <v-select
                    v-model="selectedYear"
                    outlined
                    dense
                    ref="year"
                    :items="reportYears"
                    item-value="id"
                    item-text="val"
                    label="Reporting Year"
                    placeholder="Pick Year"
                    color="success"
                    class="disp"
                  ></v-select>
                </v-col>
                <v-col cols="12" lg="3">

                  <v-label><small>Months Range</small></v-label>
                  <vc-date-picker mode="range" :class="$vuetify.theme.dark?'customMonth':''" v-model="range" />
                </v-col>
                <v-col cols="12" lg="2" class="my-5" v-if="$auth.user.userType === 'DEPARTMENT'">
                  <v-select
                    ref="user-type"
                    outlined
                    dense
                    v-model="userType"
                    label="User Type"
                    placeholder="I am a"
                    :items="userTypes"
                    color="success"
                  ></v-select>
                </v-col>
                <v-col cols="11" lg="3" class="my-5" v-if="$auth.user.userType === 'DEPARTMENT'">
                  <v-autocomplete
                    v-model="selectedUser"
                    outlined
                    dense
                    ref="user"
                    :items="assignedPeople"
                    color="blue-grey lighten-2"
                    label="Faculty / Staff / Student"
                    placeholder="My Name is"
                    item-text="fullname"
                    item-value="id"
                  >
                    <template v-slot:selection="data">
                      
                      {{ data.item.fullname }}
                   </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content
                          v-text="data.item"
                        ></v-list-item-content>
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

                <v-col cols="auto" lg="auto">
                  <v-row>
                    <v-layout align-start justify-start>
                      <v-btn
                        v-if="selectedYear"
                        :loading="loading"
                        :disabled="loading"
                        color="green"
                        x-small
                        class="mt-6 mr-1 white--text"
                        fab
                        @click="loader()"
                      >
                        Go
                      </v-btn>
                      <v-tooltip right color="blue-grey darken-2">
                      <template v-slot:activator="{ on }">
                      <v-btn
                        color="blue-grey"
                        fab
                        x-small
                        class="mt-6 white--text"
                        dark
                        @click="resetFilter"
                        v-on="on"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                      </template>
                      <span>Reset Filter</span>
                      </v-tooltip>
                    </v-layout>
                  </v-row>
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
                      {{ getActivityCount(1) }}
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
                      {{ getActivityCount(2) }}
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
                      {{ getActivityCount(3) }}
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
                      {{ getActivityCount(4) }}
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
                      {{ getActivityCount(5) }}
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
                      {{ getActivityCount(8) }}
                    </span>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ml-12"
                          tile
                          x-small
                          color="green darken-3"
                          v-on="on"
                          >{{ journalArticles }}</v-btn
                        >
                      </template>
                      <span>Journal Articles</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-2" v-on="on">{{
                          articles
                        }}</v-btn>
                      </template>
                      <span
                        >Articles for Professionals in Souvenirs, Newsletters,
                        etc..</span
                      >
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-1" v-on="on">{{
                          books
                        }}</v-btn>
                      </template>
                      <span>Books</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-1" v-on="on">{{
                          bookChapters
                        }}</v-btn>
                      </template>
                      <span>Book Chapters</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-2" v-on="on">{{
                          monoGraphs
                        }}</v-btn>
                      </template>
                      <span>Monographs</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-3" v-on="on">{{
                          manuals
                        }}</v-btn>
                      </template>
                      <span>Manuals</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-4" v-on="on">{{
                          reports
                        }}</v-btn>
                      </template>
                      <span>Reports</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-5" v-on="on">{{
                          general
                        }}</v-btn>
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
                      {{ getActivityCount(6) }}
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
                      {{ getActivityCount(7) }}
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
                      {{ getActivityCount(9) }}
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
                      {{ getActivityCount(10) }}
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
                      {{ getActivityCount(11) }}
                    </span>
                  </v-alert>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <ReportPreview />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import YearDialog from "@/components/YearDialog";
import ReportPreview from "@/components/ReportPreview";
export default {
  head() {
    return {
      title: "Dashboard",
    };
  },
  components: {
    PageHeader,
    YearDialog,
    ReportPreview,
  },
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      assignedPeople: [],
      loading: false,
      selectedUser: null,
      selectedYear: 0,
      query: null,
      yearParam: null,
      userTypeParam: null,
      monthParam: null,
      userParam: null,
      userType: null,
      userTypes: [
        {
          text: "Department",
          value: "DEPARTMENT",
        },
        {
          text: "Faculty",
          value: "FACULTY",
        },
        {
          text: "Student",
          value: "STUDENT",
        },
      ],
      options: {
        chart: {
          id: "vuechart-example",
        },
        theme: {
          palette: "palette3",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "Publications",
          data: [60, 10, 35, 50, 12, 60, 70, 91],
        },
      ],
      donutSeries: [20, 20, 20, 20, 20],
    };
  },
  watch: {
    selectedYear(val) {
      this.yearParam = "annual_year=" + val;
    },
    userType(val) {
      this.userParam = null;
      this.userTypeParam = `&user.userType=${val}`;
      if (val === "FACULTY") this.assignedPeople = this.faculties;
      if (val === "STUDENT") this.assignedPeople = this.students;
      if (val === "DEPARTMENT") this.assignedPeople = this.people;
    },
    range(val) {
      console.log(val);
      var range = Object.assign({}, val);
      this.monthParam = `&created_at_gt=${this.$moment(range.start).format(
        "YYYY-MM-DD"
      )}&created_at_lt=${this.$moment(range.end).format("YYYY-MM-DD")}`;
      console.log("Month Param:", this.monthParam);
    },
    selectedUser(val) {
      this.userParam = `&user.id=${val}`;
    },
  },
  computed: {
    journalArticles() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Journal_Article"
      ).length;
      return result;
    },
    articles() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) =>
          publication.publication_type === "Articles_for_Professionals"
      ).length;
      return result;
    },
    books() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Book"
      ).length;
      return result;
    },
    bookChapters() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Book_Chapter"
      ).length;
      return result;
    },
    monoGraphs() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Monograph"
      ).length;
      return result;
    },
    manuals() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Manual"
      ).length;
      return result;
    },
    reports() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) => publication.publication_type === "Report"
      ).length;
      return result;
    },
    general() {
      var result = this.$store.state.publication.publicationsData.result.filter(
        (publication) =>
          publication.publication_type === "Article_for_General_public"
      ).length;
      return result;
    },
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    faculties() {
      return this.people.filter((item) => item.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.userType === "STUDENT");
    },
    reportYears() {
      return this.$store.state.reportYears;
    },
    userProfile() {
      return this.$store.state.user.userProfile;
    }
  },
  async fetch({ store, $auth }) {
    let queryString = '';
    if ($auth.user.userType==='DEPARTMENT')
        queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&approval_status=Approved`;
      else
        queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&user.id=${$auth.user.id}&approval_status=Approved`;
    await store.dispatch("program/countProgrammes", { qs: queryString });
    await store.dispatch("visitor/countVisitors", { qs: queryString });
    await store.dispatch("training/countTrainings", { qs: queryString });
    await store.dispatch("presentation/countPresentations", {
      qs: queryString,
    });
    await store.dispatch("participation/countParticipations", {
      qs: queryString,
    });
    await store.dispatch("public/countPublicEngagements", { qs: queryString });
    await store.dispatch("research/countResearch", { qs: queryString });
    await store.dispatch("publication/countPublications", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", {
      qs: queryString,
    });
    await store.dispatch("recognition/countRecognitions", { qs: queryString });
    await store.dispatch("patent/countPatents", { qs: queryString });
    await store.dispatch("assignment/countAssignments", { qs: queryString });

    let queryString1 = "";
    queryString1 = `department.id=${store.state.auth.user.department}&blocked_ne=true`;
    await store.dispatch("user/setActiveUsersList", { qs: queryString1 });
  },
 
  mounted() {
    if (this.userType) {
      if (this.userType === "FACULTY") this.assignedPeople = this.faculties;
    } else this.assignedPeople = this.people;

    if(this.$auth.loggedIn) {
      if(this.$auth.user.userType==='SUPER_ADMIN')
        this.$router.push('/super');
    }
  },
  methods: {
    async loader() {
      this.loading = true;
      this.query = null;
      this.query = this.yearParam ? this.yearParam : "?deleted_ne=true&approval_status=Approved";

      if (this.range.start) this.query += this.monthParam;
      if (this.userType) this.query += this.userTypeParam;
      if (this.selectedUser) this.query += this.userParam;

      if (
        this.$auth.user.userType === "FACULTY" ||
        this.$auth.user.userType === "STUDENT"
      )
        this.query += `&user.id=${this.$auth.user.id}`;

      let queryString = "";
      queryString =
        this.query +
        `&department.id=${this.$auth.user.department}&deleted_ne=true&approval_status=Approved`;
      console.log("Final Query", this.query);
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString,
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString,
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString,
      });
      this.loading = false;
    },

    resetFilter() {
      this.getAllyears();
      this.range={}
      this.range.start=null;
      this.range.end=null;
      this.selectedYear = 0;
      this.userType = null;
      this.yearParam = null;
      this.monthParam = null;
      this.userTypeParam = null;
      this.userParam = null;
      this.query = null;
      this.selectedUser = null;
      this.assignedPeople = this.people;
    },
    async getAllyears() {
      this.loading = true;
      let queryString = "";
      if (this.$auth.user.userType==='DEPARTMENT')
        queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&approval_status=Approved`;
      else
        queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&approval_status=Approved`;
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString,
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString,
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString,
      });
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
      if (this.resetCall) {
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true`;
      } else
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.selectedYear}`;
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString,
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString,
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString,
      });
      this.loading = false;
    },

    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },
};
</script>

<style>
.customMonth input {
  background-color: transparent !important;
  border-color: rgba(255,255,255,0.3) !important;
  color: rgba(255,255,255,0.5) !important;
}
.customMonth input:hover {
  border-color: rgba(255,255,255,0.9) !important;
}
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
