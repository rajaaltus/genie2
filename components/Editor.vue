<template>
  <div>
    <!-- <pre>{{selectedYear}}{{selectedUserType}}</pre> -->
    <ClientOnly>
      <tiptap-vuetify v-model="content" :extensions="extensions" />
      <template #placeholder>
        Loading...
      </template>
    </ClientOnly>
    <div class="my-8">
      <!-- {{ content }} -->
    </div>
    <v-card flat class="mb-5" v-if="step == 6">
      <v-layout align-center justify-center>
        <v-btn small id="submit" color="green darken-2" dark @click="save">
          Submit &amp; Generate Report
        </v-btn>
      </v-layout>
    </v-card>
    <v-card flat class="mb-5" v-else>
      <v-layout align-center justify-center>
        <v-btn
          small
          id="submit"
          color="green darken-2"
          dark
          @click="handleNext(step)"
        >
          Approve &amp; Next
        </v-btn>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import { mapState } from "vuex";
export default {
  props: ["content", "step", "selectedYear", "selectedUserType", "available"],
  components: { TiptapVuetify },
  data() {
    return {
      saveReport: {
        annual_year: null,
        userType: null,
        department: null,
        section_a: null,
        section_b: null,
        section_c: null,
        section_d: null,
        section_e: null,
        section_f: null
      },
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    };
  },
  computed: {
    ...mapState({
      savedReports: state => state.reports.savedReports
    })
  },

  methods: {
    async handleNext() {
    console.log('Response:', this.$store.state.report.savedReport);
    console.log('Report Id: ',this.$store.state.report. reportId);
    
      if (this.$store.state.report.reportId==0) {
        if (this.step == 1) {
          var payload = Object.assign(
            {},
            {
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_a: this.content
            }
          );
          await this.$store.dispatch("report/addReport", payload);
        }
      } else {
        if (this.step == 1) {
          var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_a: this.content
            }
          );
          await this.$store.dispatch("report/updateReport", payload);
        }
        if (this.step == 2) {
          var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_b: this.content
            }
          );
          await this.$store.dispatch("report/updateReport", payload);
        }

        if (this.step == 3) {
          var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_c: this.content
            }
          );
          await this.$store.dispatch("report/updateReport", payload);
        }

        if (this.step == 4) {
          var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_d: this.content
            }
          );
          await this.$store.dispatch("report/updateReport", payload);
        }

        if (this.step == 5) {
          var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_e: this.content
            }
          );
          await this.$store.dispatch("report/updateReport", payload);
        }
      }
      this.$emit("next", this.step);
    },
    async save() {
      var payload = Object.assign(
            {},
            {
              id: this.$store.state.report.reportId,
              annual_year: this.selectedYear,
              userType: this.selectedUserType,
              department: this.$auth.user.department,
              section_f: this.content
            }
          );
      let rid = 0;
      rid = payload.id;
      console.log(rid);
      await this.$store.dispatch("report/updateReport", payload);
      this.$router.push(`/admin/generate/${rid}`);
    }
    
  }
};
</script>
