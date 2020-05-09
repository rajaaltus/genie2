<template>
  <div>
    <v-card tile color="grey lighten-5">
      <v-card-text class="px-0 py-0">
        <v-row class="px-5">
          <v-col cols="12" lg="3">
            <v-select
              v-model="selectedYear"
              ref="year"
              :items="reportYears"
              item-value="id"
              item-text="val"
              label="Reporting Year"
              color="success"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3">
            <v-label>Select Range</v-label>
            <vc-date-picker mode="range" v-model="range" ref="range" />
          </v-col>
          <v-col cols="12" lg="2">
            <v-select
              ref="user-type"
              v-if="$auth.user.userType === 'DEPARTMENT'"
              v-model="userType"
              label="User Type"
              :items="userTypes"
              color="success"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="3">
            <v-autocomplete
              v-model="selectedUser"
              v-if="$auth.user.userType === 'DEPARTMENT'"
              ref="user"
              :items="assignedPeople"
              color="blue-grey lighten-2"
              label="Faculty / Staff / Student"
              item-text="fullname"
              item-value="id"
            >
              <template v-slot:selection="data">
                <!-- <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        @click="data.select"
                      > -->
                <!-- <v-avatar left>
                          <v-img :src="data.item.avatar"></v-img>
                        </v-avatar> -->
                {{ data.item.fullname }}
                <!-- </v-chip> -->
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

          <v-col cols="auto" lg="auto">
            <v-row>
              <div class="mx-4 my-4">
                <v-btn
                  v-if="selectedYear"
                  :loading="loading"
                  :disabled="loading"
                  color="green"
                  x-small
                  class="white--text"
                  fab
                  @click="loader()"
                >
                  Go
                </v-btn>
              </div>
              <div class="my-4">
                <v-btn color="blue-grey" fab x-small dark @click="resetFilter">
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" md="auto" lg="auto">
            <v-card
              v-if="selectedYear && !people"
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
        <v-stepper
          v-if="
            dataLoaded && !isPreview && $auth.user.userType === 'DEPARTMENT'
          "
          v-model="report"
          style="border-radius: 0;"
        >
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

            <v-stepper-step step="6">Recogntions</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" style="padding: 0px;">
              <Editor
                :content="step1Data"
                :step="1"
                @next="handleNext(1)"
                :available="showAvailableReports"
                :selectedYear="selectedYear"
                :selectedUserType="userType"
              />
            </v-stepper-content>

            <v-stepper-content step="2" style="padding: 0px;">
              <Editor :content="step2Data" :step="2" @next="handleNext(2)" :available="showAvailableReports"/>
            </v-stepper-content>

            <v-stepper-content step="3" style="padding: 0px;">
              <Editor :content="step3Data" :step="3" @next="handleNext(3)" :available="showAvailableReports"/>
            </v-stepper-content>

            <v-stepper-content step="4" style="padding: 0px;">
              <Editor :content="step4Data" :step="4" @next="handleNext(4)" :available="showAvailableReports"/>
            </v-stepper-content>

            <v-stepper-content step="5" style="padding: 0px;">
              <Editor :content="step5Data" :step="5" @next="handleNext(5)" :available="showAvailableReports"/>
            </v-stepper-content>

            <v-stepper-content step="6" style="padding: 0px;">
              <Editor :content="step6Data" :step="6" @next="handleNext(6)" :available="showAvailableReports"/>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <div class="preview" v-else>
          <!-- <div class="preview" v-if="isPreview && dataLoaded"> -->
          <v-sheet
            class="pa-4"
            color="grey lighten-3"
            width="100%"
            height="80vh"
            v-if="dataLoaded"
          >
            <v-toolbar color="green" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title class="white--text"
                >Report Preview - {{ this.selectedYear }}-{{
                  this.selectedYear + 1
                }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon @click="exportToDoc(`Preview-${$auth.user.id}`)"
                      >mdi-download</v-icon
                    >
                  </v-btn>
                </template>
                <span>Download as Word Doc</span>
              </v-tooltip>
            </v-toolbar>
            <v-sheet
              id="download"
              elevation="6"
              v-html="previewData"
              class="mx-auto pa-4 doc"
              height="70vh"
              width="90%"
            >
            </v-sheet>
          </v-sheet>
        </div>
      </v-card-text>
    </v-card>
    <AvailableReports :report="showAvailableReports" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AvailableReports from "@/components/AvailableReports";
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import Editor from "@/components/Editor";
export default {
  head() {
    return {
      title: "Annual Report",
    };
  },
  components: {
    PageHeader,
    Editor,
    AvailableReports,
  },
  data() {
    return {
      report: 1,
      range: {
        start: null,
        end: null,
      },
      showAvailableReports: false,
      isPreview: false,
      previewData: [],
      dataLoaded: false,
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
    };
  },
  watch: {
    report(val) {
      this.reportStepper = val;
    },
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
      this.isPreview = true;
      var range = Object.assign({}, val);
      this.monthParam = `&created_at_gt=${this.$moment(range.start).format(
        "YYYY-MM-DD"
      )}&created_at_lt=${this.$moment(range.end).format("YYYY-MM-DD")}`;
      console.log("Month Param:", this.monthParam);
    },
    selectedUser(val) {
      this.isPreview = true;
      this.userParam = `&user.id=${val}`;
    },
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
      },
    },
    reportYears() {
      return this.$store.state.reportYears;
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
    ...mapState({
      aboutData: (state) => state.about.newAbout,
      programmes: (state) => state.program.programmesData.result,
      visitors: (state) => state.visitor.visitorsData.result,
      trainings: (state) => state.training.trainingsData.result,
      presentations: (state) => state.presentation.presentationsData.result,
      participations: (state) => state.participation.participationsData.result,
      publics: (state) => state.public.publicData.result,
      researchData: (state) => state.research.researchData.result,
      publications: (state) => state.publication.publicationsData.result,
      recognitions: (state) => state.recognition.recognitionsData.result,
      patents: (state) => state.patent.patentsData.result,
      assignments: (state) => state.assignment.assignmentsData.result,
      theses: (state) => state.theses.thesesData.result,
      savedReport: (state) => state.report.savedReports,
    }),
    // formattedAbout() {
    //   return this.aboutData
    // },
    formattedProgrammes() {
      return this.programmes
        .map(
          (program, index) =>
            `
            <h4><b>${
              index + 1
            }. ${program.forum.toUpperCase()} ${program.type.toUpperCase()} on "${
              program.name
            }"</b> at ${program.location} from ${program.from_date} to ${
              program.to_date
            }, Coordinated by ${program.coordinators}.<h4>
            <h4>Colloboration: ${program.colloborations}, Total Participants: ${
              program.participants_count
            }</h4>
            <p><b><u>Brief Report:</u></b> ${program.brief_report}</p>
            `
        )
        .join("");
    },
    formattedVisitors() {
      return this.visitors
        .map(
          (visitor, index) =>
            `
            <h4>${index + 1}. ${visitor.name}, ${visitor.designation} from ${
              visitor.institutional_affiliation
            } visited our department during ${visitor.from_date} - ${
              visitor.to_date
            }. He / She had given a lecture titled "${visitor.title}"</h4>
            <p><b><u>Brief Report:</u></b> ${visitor.brief_report}</p>
            `
        )
        .join("");
    },
    formattedTrainings() {
      return this.trainings
        .map(
          (training, index) =>
            `
            <h4>${index + 1}. ${
              training.faculty_name
            } attended a training programme on "${training.program_name}" at ${
              training.institutional_affiliation
            } from ${training.from_date} to ${training.to_date}, funded by ${
              training.funded_by
            }.</h4>
            <p><b><u>Brief Report:</u></b> ${training.brief_report}</p>
            `
        )
        .join("");
    },
    formattedPresentations() {
      return this.presentations
        .map(
          (presentation, index) =>
            `
            <h4><b>${
              index + 1
            }. ${presentation.forum.toUpperCase()} ${presentation.type.toUpperCase()}</b> on "${
              presentation.title
            }" by ${presentation.faculty_name}. Co-authors: ${
              presentation.coauthors
            }</h4>
            <p><b><u>Reference:</u></b> ${presentation.reference}</p>
            `
        )
        .join("");
    },
    formattedParticipations() {
      return this.participations
        .map(
          (participation, index) =>
            `
            <h4><b>${index + 1}.</b> ${participation.faculty_name}, ${
              participation.designation
            } participated in ${participation.forum} programme titled "${
              participation.program_name
            }", from ${participation.from_date} to ${
              participation.to_date
            } at ${participation.place}.</h4>
            `
        )
        .join("");
    },
    formattedPublics() {
      return this.publics
        .map(
          (item, index) =>
            `
            <h4><b>${index + 1}. ${item.type.toUpperCase()}</b> titled "${
              item.title
            }" given by ${item.faculty_name} on ${item.date} at ${
              item.place
            }.</h4>
            <h4><b>Program Name: </b>${
              item.program_name
            }, <b>Target Audience: </b>${item.target_audience}</h4>
            `
        )
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .map(
          (research, index) =>
            `
            <h4><b>${
              index + 1
            }. ${research.research_status.toUpperCase()}:</b> ${
              research.title
            }</h4>
            <h4>${research.investigator_type}: ${
              research.investigator_name
            }, Total Duration(in months): ${research.total_durations}</h4>
            <h4>Source of Funding: ${
              research.funding_source
            }, Funding agency : ${research.funding_agency}, Total funding: ${
              research.total_funds
            }, Funding during the review period/year: ${
              research.funding_on_review_period
            }</h4>
            <p><b><u>Brief Report/Abstract: </u></b> ${
              research.research_abstract
            }</p>
            `
        )
        .join("");
    },
    formattedPublications() {
      return this.publications
        .map(
          (publication, index) =>
            `
            <h4><b>${
              index + 1
            }. ${publication.classification.toUpperCase()}, ${publication.publication_type.toUpperCase()}</b></h4>
            <p>${publication.reference}</p>
            `
        )
        .join("");
    },
    formattedRecognitions() {
      return this.recognitions
        .map(
          (recognition, index) =>
            `
            <h4><b>${index + 1}.</b> ${
              recognition.faculty_name
            } has been awarded as "${recognition.award_title}" from ${
              recognition.organization
            },${recognition.place} on ${recognition.date}.</h4>
            `
        )
        .join("");
    },
    formattedPatents() {
      return this.patents
        .map(
          (patent, index) =>
            `
            <h4><b>${index + 1}. ${patent.registration_no}:</b> ${
              patent.title
            }</h4>
            <p><b><u>Brief Report: </u></b> ${patent.brief_report}</p>
            `
        )
        .join("");
    },
    formattedAssignments() {
      return this.assignments
        .map(
          (assignment, index) =>
            `
            <h4><b>${
              index + 1
            }. ${assignment.classification.toUpperCase()}:</b> ${
              assignment.faculty_name
            }, ${assignment.designation}, ${assignment.roles}</b></h4>
            <p><b><u>Brief Report: </u></b> ${assignment.brief_report}</p>
            `
        )
        .join("");
    },

    step1Data() {
      return (
        `<h1><b><u>Section B:</u></b></h1>` +
        `<h3><b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b></h3>` +
        this.formattedProgrammes +
        `<hr><h3><b>2. VISITORS TO THE DEPARTMENT<b></h3>` +
        this.formattedVisitors +
        `<hr><h3><b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY / STAFF / STUDENTS OUTSIDE NIMHANS<b></h3>` +
        this.formattedTrainings
      );
    },
    step2Data() {
      return (
        `<h3><b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b></h3>` +
        `<h3><b>A. PRESENTATIONS/ POSTERS</b></h3>` +
        this.formattedPresentations +
        `<hr><h3><b>B. PARTICIPATIONS</b></h3>` +
        this.formattedParticipations
      );
    },
    step3Data() {
      return (
        `<h3><b>5. PUBLIC ENGAGEMENT & OUTREACH ACTIVITIES</b></h3>` +
        this.formattedPublics
      );
    },
    step4Data() {
      return `<h3><b>6. RESEARCH ACTIVITIES</b></h3>` + this.formattedResearch;
    },
    step5Data() {
      return `<h3><b>5. PUBLICATIONS</b></h3>` + this.formattedPublications;
    },
    step6Data() {
      return (
        `<h3><b>5. RECOGNITION OF NIMHANS CONTRIBUTION </b></h3>` +
        `<h3><b>A. AWARDS AND HONORS </b></h3>` +
        this.formattedRecognitions +
        `<hr><h3><b>B. PATENTS </b></h3>` +
        this.formattedPatents +
        `<hr><h3><b>C. KEY ASSIGNMENTS </b></h3>` +
        this.formattedAssignments
      );
    },
  },
  methods: {
    async loader() {
      this.$store.dispatch("report/initializeReportId", 0);
      this.report = 1;
      this.loading = true;
      this.query = null;
      this.query = this.yearParam ? this.yearParam : "?deleted_ne=true";

      if (this.range.start) this.query += this.monthParam;

      if (this.userType) this.query += this.userTypeParam;

      if (this.selectedUser) this.query += this.userParam;

      if (this.yearParam && this.userTypeParam) {
        let queryString = "";
        queryString =
          this.yearParam +
          `&userType=${this.userType}&department.id=${this.$auth.user.department}`;
        await this.$store.dispatch("report/setSavedReport", {
          fq: queryString,
        });
        if (
          this.$store.state.report.savedReport[0] &&
          this.$store.state.report.savedReport[0].id
        ) {
          this.showAvailableReports = true;
        } else {
          this.showAvailableReports = false;
        }
      }

      if (
        this.$auth.user.userType === "FACULTY" ||
        this.$auth.user.userType === "STUDENT"
      )
        this.query += `&user.id=${this.$auth.user.id}`;

      let queryString = "";
      queryString =
        this.query +
        `&department.id=${this.$auth.user.department}&deleted_ne=true`;

      await this.$store.dispatch("program/setProgrammesData", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/setVisitorsData", {
        qs: queryString,
      });
      await this.$store.dispatch("training/setTrainingsData", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/setPresentationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/setParticipationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("public/setPublicData", { qs: queryString });
      await this.$store.dispatch("research/setResearchData", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/setRecognitionsData", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/setPatentsData", { qs: queryString });
      await this.$store.dispatch("assignment/setAssignmentsData", {
        qs: queryString,
      });
      this.previewData =
        this.step1Data +
        this.step2Data +
        this.step3Data +
        this.step4Data +
        this.step5Data +
        this.step6Data;
      this.loading = false;
      this.dataLoaded = true;
    },
    resetFilter() {
      this.report = 1;
      this.range = {};
      this.previewData = [];
      this.range.start = null;
      this.showAvailableReports = false;
      this.range.end = null;
      this.selectedYear = 0;
      this.userType = null;
      this.yearParam = null;
      this.monthParam = null;
      this.userTypeParam = null;
      this.userParam = null;
      this.query = null;
      this.selectedUser = null;
      this.assignedPeople = this.people;
      this.dataLoaded = false;
      this.isPreview = false;
    },
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
    exportToDoc(filename = "") {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        // preHtml + document.getElementsByClassName('ProseMirror')[0].innerHTML + postHtml;
        preHtml + document.getElementById("download").innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    },
  },
};
</script>

<style scoped>
.preview {
  max-width: 100%;
}
.doc {
  overflow: scroll;
}
</style>
