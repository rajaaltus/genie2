<template>
  <div>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      @set-year="setReportingYear"
      class="ml-0 pb-0 pt-0"
    />
    <v-stepper v-model="report">
      <v-stepper-header>
        <v-stepper-step :complete="report > 1" step="1" editable
          >Programme activities</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 2" step="2" editable
          >Presentations</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 3" step="3" editable
          >Public Engagements</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 4" step="4" editable
          >Research Activities</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 5" step="5" editable
          >Publications</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="6" editable>Recogntions</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Editor :content="formattedProgram" />
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="report = 2">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <Editor :content="presentations" />
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mr-2" @click="report = 3">
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 1"> Back </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <Editor :content="publicEngagements" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mr-2" @click="report = 4">
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 2"> Back </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="4">
          <Editor :content="researchData" />

          <v-row>
            <v-spacer></v-spacer>
             <v-btn color="primary" small class="mr-2" @click="report = 5">
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 3"> Back </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="5">
          <Editor :content="publications" />

          <v-row>
            <v-spacer></v-spacer>
             <v-btn color="primary" small class="mr-2" @click="report = 6">
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 4"> Back </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="6">
          <Editor :content="recognitions" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mr-2" @click="save">
              Save
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 5"> Back </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
    ...mapState({
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
    formattedProgram() {
      return this.programmes.map(
        program =>
          `
            <h2>${program.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${program.from_date} - ${
            program.to_date
          }</h4>
            <p>${program.brief_report}</p><hr>
            `
      ).join("");
    },
    presentations() {
      return `<h1>Yay Headlines from Presentations!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    publicEngagements() {
      return `<h1>Yay Headlines from Publica Engagements!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    publications() {
      return `<h1>Yay Headlines from Publications!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    researchData() {
      return `<h1>Yay Headlines from Research Data!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    recognitions() {
      return `<h1>Yay Headlines from Recognitions!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    }
  },
  data() {
    return {
      report: 1,
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      step6: ""
    };
  },

  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
    await store.dispatch("program/setProgrammesData", { qs: queryString });
  },
  methods: {
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    }
  }
};
</script>
