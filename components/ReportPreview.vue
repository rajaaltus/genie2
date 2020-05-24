<template>
  <div>
    <v-card tile >
      <v-card-text class="px-0 py-0">
        <v-row class="px-5">
          <v-col cols="12" lg="2" class="mt-5">
            <v-select
              outlined
              dense
              v-model="selectedYear"
              ref="year"
              :items="reportYears"
              item-value="id"
              item-text="val"
              label="Reporting Year"
              placeholder="Pick Year"
              color="success"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3">
            <v-label><small>Months Range</small></v-label>
            <vc-date-picker mode="range" v-model="range" :class="$vuetify.theme.dark?'customMonth':''" ref="range" />
          </v-col>
          <v-col cols="12" lg="2" class="mt-5" v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-select
              outlined
              dense
              ref="user-type"
              v-model="userType"
              label="User Type"
              placeholder="I am a"
              :items="userTypes"
              color="success"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="3" class="mt-5" v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-autocomplete
              outlined
              dense
              v-model="selectedUser"
              ref="user"
              :items="assignedPeople"
              color="blue-grey lighten-2"
              label="Faculty / Staff / Student"
              placeholder="My Name is"
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
        <!-- {{ queryData }} -->
        <v-stepper
          v-if="
            dataLoaded && isPreview!==true && $auth.user.userType === 'DEPARTMENT'
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
              <Editor
                :content="step2Data"
                :step="2"
                @next="handleNext(2)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="3" style="padding: 0px;">
              <Editor
                :content="step3Data"
                :step="3"
                @next="handleNext(3)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="4" style="padding: 0px;">
              <Editor
                :content="step4Data"
                :step="4"
                @next="handleNext(4)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="5" style="padding: 0px;">
              <Editor
                :content="step5Data"
                :step="5"
                @next="handleNext(5)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="6" style="padding: 0px;">
              <Editor
                :content="step6Data"
                :step="6"
                @next="handleNext(6)"
                :available="showAvailableReports"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <div class="preview" v-else>
          <!-- <div class="preview" v-if="isPreview && dataLoaded"> -->
          <v-sheet width="100%" height="210vh" v-if="dataLoaded">
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title class="white--text"
                >Consolidated Report for the Year - {{ this.selectedYear }} -
                {{ this.selectedYear + 1 }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip left color="blue-grey darken-3">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon @click="exportToDoc(`Preview-${$auth.user.id}`)"
                      >mdi-download</v-icon
                    >
                  </v-btn>
                </template>
                <span>Download Report</span>
              </v-tooltip>
            </v-toolbar>
            <v-sheet
              id="download"
              elevation="6"
              v-html="previewData"
              class="mx-auto pa-4 doc"
              height="210vh"
              width="100%"
            >
            </v-sheet>
          </v-sheet>
        </div>
      </v-card-text>
    </v-card>
    <AvailableReports :availableReports="availableReports" v-if="sheet" />
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
      sheet: false,
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
      if (val.start) {
        this.dataLoaded = false;
        this.isPreview = true;
      }
      var range = Object.assign({}, val);
      this.monthParam = `&created_at_gt=${this.$moment(range.start).format(
        "YYYY-MM-DD"
      )}&created_at_lt=${this.$moment(range.end).format("YYYY-MM-DD")}`;
      console.log("Month Param:", this.monthParam);
      // console.log("at Range:", this.isPreview);
    },
    selectedUser(val) {
      if(val)
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
      availableReports: (state) => state.report.availableReports,
    }),
    // formattedAbout() {
    //   return this.aboutData
    // },
    formattedProgrammes() {
      return this.programmes
        .map(
          (program, index) =>
            `
            <p><b>${
              index + 1
            }. ${program.forum.toUpperCase()} ${program.type.toUpperCase()} on "${
              program.name
            }" at ${program.location}</b> from ${program.from_date} to ${
              program.to_date
            }, Coordinated by ${program.coordinators}.</p>
            <p>Collaboration: ${program.colloborations}, Total Participants: ${
              program.participants_count
            }</p>
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
            <p><b>${index + 1}. ${visitor.name}, ${
              visitor.designation
            }</b> from ${
              visitor.institutional_affiliation
            } visited to our department during ${visitor.from_date} - ${
              visitor.to_date
            }. He / She had given a lecture titled "${visitor.title}"</p>
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
            <p><b>${index + 1}. ${
              training.faculty_name
            }</b> has attended a training programme on "${
              training.program_name
            }" at ${training.institutional_affiliation} from ${
              training.from_date
            } to ${training.to_date}, funded by ${training.funded_by}.</p>
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
            <p><b>${
              index + 1
            }. ${presentation.forum.toUpperCase()} ${presentation.type.toUpperCase()}</b> on "${
              presentation.title
            }" by ${presentation.faculty_name}. Co-authors: ${
              presentation.coauthors
            }</p>
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
            <p><b>${index + 1}. ${participation.faculty_name}, ${
              participation.designation
            }</b> participated in ${participation.forum} programme titled "${
              participation.program_name
            }", from ${participation.from_date} to ${
              participation.to_date
            } at ${participation.place}.</p>
            `
        )
        .join("");
    },
    formattedPublics() {
      return this.publics
        .map(
          (item, index) =>
            `
            <p><b>${index + 1}. ${item.type.toUpperCase()}</b> titled "${
              item.title
            }" given by ${item.faculty_name} on ${item.date} at ${
              item.place
            }.</p>
            <p><b>Program Name: </b>${
              item.program_name
            }, <b>Target Audience: </b>${item.target_audience}</p>
            `
        )
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .map(
          (research, index) =>
            `
            <p><b>${index + 1}. ${research.research_status.toUpperCase()}: ${
              research.title
            }</b></p>
            <p>${research.investigator_type}: ${
              research.investigator_name
            }, Total Duration(in months): ${research.total_durations}</p>
            <p>Source of Funding: ${
              research.funding_source
            }, Funding agency : ${research.funding_agency}, Total funding: ${
              research.total_funds
            }, Funding during the review period/year: ${
              research.funding_on_review_period
            }</p>
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
            <p><b>${
              index + 1
            }. ${publication.classification.toUpperCase()}, ${publication.publication_type.toUpperCase()}</b></p>
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
            <p><b>${index + 1}. ${
              recognition.faculty_name
            }</b> has been awarded as "${recognition.award_title}" by ${
              recognition.organization
            },${recognition.place} on ${recognition.date}.</p>
            `
        )
        .join("");
    },
    formattedPatents() {
      return this.patents
        .map(
          (patent, index) =>
            `
            <p><b>${index + 1}. ${patent.registration_no}:</b> ${
              patent.title
            }</p>
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
            <p><b>${
              index + 1
            }. ${assignment.classification.toUpperCase()}:</b> ${
              assignment.faculty_name
            }, ${assignment.designation}, ${assignment.roles}</p>
            <p><b><u>Brief Report: </u></b> ${assignment.brief_report}</p>
            `
        )
        .join("");
    },

    step1Data() {
      var html ='';
      if(this.formattedProgrammes.length>0)
      {
      
       html = `<h1><b><u>Section B:</u></b></h1>` +
        `<h3><b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b></h3>` +
        this.formattedProgrammes;
      }
      if(this.formattedVisitors.length>0) { 
        html += 
        `<hr><h3><b>2. VISITORS TO THE DEPARTMENT</b></h3>` +
        this.formattedVisitors;
        }
      if(this.formattedTrainings) { 
        html +=
        `<hr><h3><b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY / STAFF / STUDENTS OUTSIDE NIMHANS</b></h3>` +
        this.formattedTrainings; 
      
      }
      return html;
    },
    step2Data() {
      var html ='';
      if( this.formattedPresentations.length>0)
      {
        html = `<h3><b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b></h3>` +
        `<h3><b>A. PRESENTATIONS/ POSTERS</b></h3>` +
        this.formattedPresentations;
      }
      if( this.formattedParticipations.length>0)
      {
      
        html += 
        `<hr><h3><b>B. PARTICIPATIONS</b></h3>` +
        this.formattedParticipations
      }
      return html;
    
    },
    step3Data() {
      var html ='';
      if( this.formattedPublics.length>0)
      {
        html =
        `<h3><b>5. PUBLIC ENGAGEMENT & OUTREACH ACTIVITIES</b></h3>` +
        this.formattedPublics
      }
      return html;
    },
    step4Data() {
       var html ='';
      if( this.formattedResearch.length>0)
      {
        html =
      `<h3><b>6. RESEARCH ACTIVITIES</b></h3>` + this.formattedResearch;
      }
      return html;
    },
    step5Data() {
      var html ='';
      if( this.formattedPublications.length>0)
      {
        html =
      `<h3><b>5. PUBLICATIONS</b></h3>` + this.formattedPublications;
      }
      return html;
    },
    step6Data() {
     var html ='';
      if( this.formattedRecognitions.length>0)
      {
        html = 
        `<h3><b>5. RECOGNITION OF NIMHANS CONTRIBUTION </b></h3>` +
        `<h3><b>A. AWARDS AND HONORS </b></h3>` +
        this.formattedRecognitions ;
      }
      if( this.formattedPatents.length>0)
      {
        html += 

        `<hr><h3><b>B. PATENTS </b></h3>` +
        this.formattedPatents 
      }
      if( this.formattedAssignments.length>0)
      {
        html += 
        `<hr><h3><b>C. KEY ASSIGNMENTS </b></h3>` +
        this.formattedAssignments
      }
      return html;
      
    },
  },
  methods: {
    async loader() {
      this.sheet = false;
      this.$store.dispatch("report/initializeReportId", 0);
      this.report = 1;
      this.loading = true;
      this.query = null;
      this.query = this.yearParam ? this.yearParam : "?deleted_ne=true";

      if (this.yearParam) {
        let findQuery = "";
        findQuery = `annual_year=${this.selectedYear}&department.id=${this.$store.state.auth.user.department}`;
        await this.$store.dispatch("report/setAvailableReports", {
          qs: findQuery,
        });
      }

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
        if (this.availableReports.length > 0 && !this.isPreview) {
          this.sheet = true;
        } else this.sheet = false;
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
    async resetFilter() {
      this.isPreview = false;
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
