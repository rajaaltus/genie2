<template>
  <div>
    <v-card tile color="grey lighten-5">
      <v-card-text class="px-0 py-0">
        <v-row class="px-5" ref="queryData">
          <v-col cols="12" lg="3">
            <v-select
              ref="annualYear"
              v-model="queryData.annualYear"
              :items="reportYears"
              item-value="id"
              item-text="val"
              label="Reporting Year"
              color="success"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="3">
            <v-select
              ref="userType"
              v-model="queryData.userType"
              label="User Type"
              :items="userTypes"
              color="success"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="3">
            <v-select
              ref="people"
              v-model="people"
              :items="peoples"
              item-text="fullname"
              item-value="id"
              label="Faulty / Staff / Student"
              color="success"
            ></v-select>
          </v-col>

          <v-col cols="auto" lg="auto">
            <v-row>
              <div class="my-4">
                <v-btn color="blue-grey" fab x-small dark @click="reset">
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </div>
              <div class="mx-4 my-4">
                <v-btn
                  v-if="queryData.annualYear && queryData.userType"
                  :loading="goBtnLoading"
                  :disabled="goBtnLoading"
                  color="green"
                  x-small
                  class="white--text"
                  fab
                  @click="loader = 'goBtnLoading'"
                >
                  Go
                </v-btn>
              </div>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" md="auto" lg="auto">
            <v-card
              v-if="queryData.annualYear && !people"
              tile
              class="px-2 py-2"
              color="yellow lighten-1"
            >
              <span class="caption font-weight-bold">Available Reports </span>
              <v-layout align-end justify-start>
                <v-tooltip bottom color="#2c549b">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      to="/admin/reports"
                      color="#2c549b"
                      class="mr-1"
                      x-small
                      fab
                      dark
                      v-on="on"
                    >
                      <v-icon small class="px-1">mdi-file-word</v-icon>
                    </v-btn>
                  </template>
                  <span>Faculty Report</span>
                </v-tooltip>

                <v-tooltip bottom color="#2c549b">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      to="/admin/reports"
                      color="#2c549b"
                      x-small
                      fab
                      dark
                      v-on="on"
                    >
                      <v-icon small class="px-1">mdi-file-word</v-icon>
                    </v-btn>
                  </template>
                  <span>Student Report</span>
                </v-tooltip>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
        <!-- {{ queryData }} -->
        <v-stepper v-if="dataLoaded" v-model="report" style="border-radius:0;">
          <v-stepper-header>
            <v-stepper-step :complete="report > 1" step="1" 
              >Programmes / Events</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="report > 2" step="2" 
              >Contribution To Scientific Deliberations</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="report > 3" step="3" 
              >Public Engagement</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="report > 4" step="4" 
              >Research Activities</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="report > 5" step="5" 
              >Publications</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="6" >Recogntions</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" style="padding:0px;">
              <Editor
                :content="step1Data"
                :step="1"
                @next="handleNext(1)"
                @previous="handlePrevious(1)"
                :selectedYear="queryData.annualYear"
                :selectedUserType="queryData.userType"
              />
            </v-stepper-content>

            <v-stepper-content step="2" style="padding:0px;">
              <Editor
                :content="step2Data"
                :step="2"
                @next="handleNext(2)"
                @previous="handlePrevious(2)"
              />
            </v-stepper-content>

            <v-stepper-content step="3" style="padding:0px;">
              <Editor
                :content="step3Data"
                :step="3"
                @next="handleNext(3)"
                @previous="handlePrevious(3)"
              />
            </v-stepper-content>

            <v-stepper-content step="4" style="padding:0px;">
              <Editor
                :content="step4Data"
                :step="4"
                @next="handleNext(4)"
                @previous="handlePrevious(4)"
              />
            </v-stepper-content>

            <v-stepper-content step="5" style="padding:0px;">
              <Editor
                :content="step5Data"
                :step="5"
                @next="handleNext(5)"
                @previous="handlePrevious(5)"
              />
            </v-stepper-content>

            <v-stepper-content step="6" style="padding:0px;">
              <Editor
                :content="step6Data"
                :step="6"
                @next="handleNext(6)"
                @previous="handlePrevious(6)"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import Editor from "@/components/Editor";
export default {
  head() {
    return {
      title: "Annual Report"
    };
  },
  components: {
    PageHeader,
    Editor
  },
  data() {
    return {
      report: 1,
      people: "",
      dataLoaded: false,
      queryData: {
        annualYear: 0,
        userType: ""
      },
      loader: null,
      goBtnLoading: false,
      userTypes: [
        {text: "Department", value: "DEPARTMENT" },
        { text: "Faculty", value: "FACULTY" },
        { text: "Student", value: "STUDENT" }
      ]
    };
  },
  watch: {
    report(val) {
      this.reportStepper = val;
    },
    async loader() {
      this.$store.dispatch('report/initializeReportId', 0);
      this.dataLoaded = false;
      this.report = 1;
      const l = this.loader;
      this[l] = !this[l];

      let findQuery = "";
      findQuery = `department.id=${this.$store.state.auth.user.department}&annual_year=${this.queryData.annualYear}&userType=${this.queryData.userType}`;
      await this.$store.dispatch('report/setSavedReport', {fq: findQuery})
      
      console.log('Fetch Started from Watch: ');
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&annual_year=${this.queryData.annualYear}&user.userType=${this.queryData.userType}&deleted_ne=true`;
      await this.$store.dispatch("program/setProgrammesData", {
        qs: queryString
      });
      await this.$store.dispatch("visitor/setVisitorsData", {
        qs: queryString
      });
      await this.$store.dispatch("training/setTrainingsData", {
        qs: queryString
      });
      await this.$store.dispatch("presentation/setPresentationsData", {
        qs: queryString
      });
      await this.$store.dispatch("participation/setParticipationsData", {
        qs: queryString
      });
      await this.$store.dispatch("public/setPublicData", { qs: queryString });
      await this.$store.dispatch("research/setResearchData", {
        qs: queryString
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString
      });
      await this.$store.dispatch("recognition/setRecognitionsData", {
        qs: queryString
      });
      await this.$store.dispatch("patent/setPatentsData", { qs: queryString });
      await this.$store.dispatch("assignment/setAssignmentsData", {
        qs: queryString
      });
      this[l] = !this[l];
      (this.loader = null), (this.dataLoaded = true);
    
    }
  },

  computed: {
    // reportId() {
    //   return this.$store.state.report.reportId;
    // },
    reportStepper: {
      get() {
        return this.$store.state.reportStepper;
      },
      set(report) {
        this.$store.dispatch("updateStepper", report);
      }
    },
    reportYears() {
      return this.$store.state.reportYears;
    },
    peoples() {
      return this.$store.state.user.activeUsersList.result;
    },
    ...mapState({
      aboutData: state => state.about.newAbout,
      programmes: state => state.program.programmesData.result,
      visitors: state => state.visitor.visitorsData.result,
      trainings: state => state.training.trainingsData.result,
      presentations: state => state.presentation.presentationsData.result,
      participations: state => state.participation.participationsData.result,
      publics: state => state.public.publicData.result,
      researchData: state => state.research.researchData.result,
      publications: state => state.publication.publicationsData.result,
      recognitions: state => state.recognition.recognitionsData.result,
      patents: state => state.patent.patentsData.result,
      assignments: state => state.assignment.assignmentsData.result,
      theses: state => state.theses.thesesData.result
    }),
    // formattedAbout() {
    //   return this.aboutData
    // },
    formattedProgrammes() {
      return this.programmes
        .map(
          (program, index) =>
            `
            <h2>${index + 1}. ${program.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${program.from_date} - ${
              program.to_date
            }</h4>
            <p>${program.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedVisitors() {
      return this.visitors
        .map(
          (visitor, index) =>
            `
            <h2>${index + 1}. ${visitor.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${visitor.from_date} - ${
              visitor.to_date
            }</h4>
            <p>${visitor.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedTrainings() {
      return this.trainings
        .map(
          (training, index) =>
            `
            <h2>${index + 1}. ${training.program_name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${training.from_date} - ${
              training.to_date
            }</h4>
            <p>${training.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedPresentations() {
      return this.presentations
        .map(
          (presentation, index) =>
            `
            <h2>${index + 1}. ${presentation.type.toUpperCase()}<h2>
            <h4><span>Forum: </span>${presentation.forum}</h4>
            <p>${presentation.reference}</p><hr>
            `
        )
        .join("");
    },
    formattedParticipations() {
      return this.participations
        .map(
          (participation, index) =>
            `
            <h2>${index + 1}. ${participation.program_name.toUpperCase()}<h2>
            <h4><span>Forum: </span>${participation.forum}</h4>
            <p>${participation.place}</p><hr>
            `
        )
        .join("");
    },
    formattedPublics() {
      return this.publics
        .map(
          (item, index) =>
            `
            <h2>${index + 1}. ${item.title.toUpperCase()}<h2>
            <h4><span>Program Name: </span>${item.program_name}</h4>
            <p>Date: ${item.date}</p><hr>
            `
        )
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .map(
          (research, index) =>
            `
            <h2>${index + 1}. ${research.title.toUpperCase()}<h2>
            <h4><span>Funding Agency: </span>${research.funding_agency}</h4>
            <p>Date: ${research.research_abstract}</p><hr>
            `
        )
        .join("");
    },
    formattedPublications() {
      return this.publications
        .map(
          (publication, index) =>
            `
            <h2>${index + 1}. ${publication.publication_type.toUpperCase()}<h2>
            <h4><span>Classification: </span>${publication.classification}</h4>
            <p>Date: ${publication.reference}</p><hr>
            `
        )
        .join("");
    },
    formattedRecognitions() {
      return this.recognitions
        .map(
          (recognition, index) =>
            `
            <h2>${index + 1}. ${recognition.award_title.toUpperCase()}<h2>
            <h4><span>Organization: </span>${recognition.organization}</h4>
            <p>Date: ${recognition.date}</p><hr>
            `
        )
        .join("");
    },
    formattedPatents() {
      return this.patents
        .map(
          (patent, index) =>
            `
            <h2>${index + 1}. ${patent.title.toUpperCase()}<h2>
            <h4><span>Reg.NO: </span>${patent.registration_no}</h4>
            <p>Report: ${patent.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedAssignments() {
      return this.assignments
        .map(
          (assignment, index) =>
            `
            <h2>${index + 1}. ${assignment.roles.toUpperCase()}<h2>
            <h4><span>Classification: </span>${assignment.classification}</h4>
            <p>Report: ${assignment.brief_report}</p><hr>
            `
        )
        .join("");
    },

    step1Data() {
      return (
        `<h1>Programmes / Events</h1>` +
        this.formattedProgrammes +
        `<h1>Visitors</h1>` +
        this.formattedVisitors +
        `<h1>Trainings</h1>` +
        this.formattedTrainings
      );
    },
    step2Data() {
      return (
        `<h1>Presentation / Posters</h1>` +
        this.formattedPresentations +
        `<h1>Participations</h1>` +
        this.formattedParticipations
      );
    },
    step3Data() {
      return `<h1>Public Engagements</h1>` + this.formattedPublics;
    },
    step4Data() {
      return `<h1>Research Activities</h1>` + this.formattedResearch;
    },
    step5Data() {
      return `<h1>Publications</h1>` + this.formattedPublications;
    },
    step6Data() {
      return (
        `<h1>Recognitions</h1>` +
        this.formattedRecognitions +
        `<h1>Patents</h1>` +
        this.formattedPatents +
        `<h1>Key Assignments</h1>` +
        this.formattedAssignments
      );
    }
  },
  methods: {
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    save() {
      console.log("Save Clicked!");
    },
    handleNext(step) {
      this.report = step + 1;
    },
    handlePrevious(step) {
      this.report = step - 1;
    },
    reset() {
      this.$refs.annualYear.reset();
      this.$refs.userType.reset();
      this.$refs.people.reset();
      this.dataLoaded = false;
      this.$store.dispatch("updateStepper", 0);
    }
  }
};
</script>
