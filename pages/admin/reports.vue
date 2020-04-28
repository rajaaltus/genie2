<template>
  <div>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      @set-year="setReportingYear"
      class="ml-0 pb-0 pt-0"
    />
    <v-stepper v-model="report" vertical>
      <v-stepper-step :complete="report > 1" step="1" editable>
        Report
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <div class="my-4">
          <Editor v-model="step1" :content="introduction" />
          <pre>{{step1}}</pre>
        </div>
         
        <v-btn color="primary" @click="report = 2">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="report > 2" step="2" editable
        >Configure analytics for this app</v-stepper-step
      >

      <v-stepper-content step="2">
         <div class="my-4">
          <Editor v-model="step2" :content="promotions"/>
        </div>
        <v-btn color="primary" @click="report = 3">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="report > 3" step="3" editable
        >Select an ad format and name ad unit</v-stepper-step
      >

      <v-stepper-content step="3">
         <div class="my-4">
          <Editor v-model="step3" :content="publications"/>
        </div>
        <v-btn color="primary" @click="report = 4">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">View setup instructions</v-stepper-step>
      <v-stepper-content step="4">
         <div class="my-4">
          <Editor v-model="step4" :content="activities"/>
        </div>
        <v-btn color="primary" @click="report = 1">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader"
import Editor from '@/components/Editor'
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
    }
  },
  data() {
    return {
      report: 1,
      step1: "",
      step2: "",
      step3: "",
      step4: ""
    };
  },
  computed: {
    introduction() {
      return `<h1>Yay Headlines from Introduction!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    promotions() {
      return `<h1>Yay Headlines from Promotions!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    publications() {
      return `<h1>Yay Headlines from Publications!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
    activities() {
      return `<h1>Yay Headlines from Activities!</h1>
      <hr>
      <p>All these <strong>cool tags</strong> are working now.</p>`;
    },
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
