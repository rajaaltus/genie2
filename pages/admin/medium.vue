<template>
  <div>
    <PageHeader :title="$metaInfo.title" />
    <v-row class="px-5">
          <v-col cols="11" lg="3">
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

          <v-col cols="11" lg="3">
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
    </v-row>
    <client-only>
      <ckeditor
        v-model="report"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
    </client-only>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
if (process.client) {
  require("~/plugins/ckeditor");
}
import PageHeader from "@/components/PageHeader";
export default {
  head() {
    return {
      title: "Testing Reporting"
    };
  },
  components: {
    PageHeader
  },
  data: () => ({
    editorConfig: {
      height: "200px"
    },
    report: null,
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
    
  }),
  computed: {
      people() {
      return this.$store.state.user.activeUsersList.result;
    },
    ...mapState({
      programmes: state => state.program.programmesData.result
    }),
    editor() {
      return process.client
        ? require("@ckeditor/ckeditor5-build-classic")
        : null;
    },
    // report() {
    //   return this.$store.state.program.programmesData.result 
    //     .map(                                                
    //       program =>
    //         `
    //         <h2>${program.name.toUpperCase()}<h2>
    //         <h4><span>Duration: </span>${program.from_date} - ${program.from_date}</h4>
    //         <p>${program.brief_report}</p><hr>
    //         `
    //     )
    //     .join("");
    // }
  },

  mounted() {
    let queryString = "";
    queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$store.state.auth.user.id}&annual_year=${this.$store.state.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
    this.$store.dispatch("program/setProgrammesData", { qs: queryString });
    if (this.selectedYear == 0)
      this.selectedYear = this.$store.state.selectedYear;
    if (this.selectedUser === null)
      this.selectedUser = this.$auth.user.id;
    this.fetchAllData();
  },
  methods: {
      async setReport() {
          this.report = null;
          this.report = this.programmes 
        .map(                                                
          program =>
            `
            <h2>${program.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${program.from_date} - ${program.from_date}</h4>
            <p>${program.brief_report}</p><hr>
            `
        )
        .join("");
      },
      async fetchAllData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.selectedUser}&annual_year=${this.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
      await this.$store.dispatch("program/setProgrammesData", { qs: queryString });
    //   this.$store.dispatch("visitor/setVisitorsData", { qs: queryString });
    //   this.$store.dispatch("training/setTrainingsData", { qs: queryString });
    //   this.$store.dispatch("presentation/setPresentationsData", {
    //     qs: queryString
    //   });
    //   this.$store.dispatch("participation/setParticipationsData", {
    //     qs: queryString
    //   });
    //   this.$store.dispatch("public/setPublicData", { qs: queryString });
    //   this.$store.dispatch("publication/setPublicationsData", {
    //     qs: queryString
    //   });
    //   this.$store.dispatch("research/setResearchData", { qs: queryString });
    //   this.$store.dispatch("recognition/setRecognitionsData", {
    //     qs: queryString
    //   });
    //   this.$store.dispatch("patent/setPatentsData", { qs: queryString });
    //   this.$store.dispatch("assignment/setAssignmentsData", {
    //     qs: queryString
    //   });
    //   this.$store.dispatch("theses/setThesesData", { qs: queryString });
      this.loading = false;
      this.setReport();
    //   return this.$store.state.program.programmesData.result;
    //   return this.$store.state.visitor.visitorsData.result;
    //   return this.$store.state.training.trainingsData.result;
    //   return this.$store.state.presentation.presentationsData.result;
    //   return this.$store.state.participation.participationsData.result;
    //   return this.$store.state.public.publicData.result;
    //   return this.$store.state.research.researchData.result;
    //   return this.$store.state.publication.publicationsData.result;
    //   return this.$store.state.recognition.recognitionsData.result;
    //   return this.$store.state.patent.patentsData.result;
    //   return this.$store.state.assignment.assignmentsData.result;
    //   return this.$store.state.theses.thesesData.result;
      
    },
  }
};
</script>
