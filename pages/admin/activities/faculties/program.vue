<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-note-outline cust-icon"></span>
        Activities &amp; Resources
      </v-tab>
      <v-tab>
        <span class="mdi mdi-table cust-icon"></span>
        Records
      </v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <YearDialog v-if="$store.state.selectedYear == 0" />
            <PageHeader
              :title="$metaInfo.title"
              :reportYears="reportYears"
              :selectedYear="$store.state.selectedYear"
              class="ml-0 pb-0 pt-0"
            />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <FacultyActivities />
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">
                <ProgramForm
                  :programNames="$store.state.program.programNames"
                  :dataFrom="$store.state.staffs"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="12" md="12">
                <ProgramTable
                  :reportYears="reportYears"
                  :annualYear="$store.state.selectedYear"
                  :programmesData="$store.state.program.programmesData"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import FacultyActivities from "@/components/FacultyActivities";
import YearDialog from "@/components/YearDialog";
import ProgramForm from "@/components/forms/ProgramForm";
import ProgramTable from "@/components/tables/ProgramTable";
import Swal from "sweetalert2";
export default {
  head() {
    return {
      title: "Programmes & Events"
    };
  },
  components: {
    PageHeader,
    FacultyActivities,
    YearDialog,
    ProgramForm,
    ProgramTable
  },
  data: () => ({
    staffs: [],
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
    ]
  }),
  async fetch({ store }) {
    await store.dispatch("setActivities");

    if (store.state.user.fullUser) {
      let userId = store.state.auth.user.id;
      await store.dispatch("user/setFullUser", { id: userId });

      await store.dispatch("program/setProgramNames");

      if (store.state.staffs.length == 0) {
        let qs = "";
        qs = `department.id=${store.state.auth.user.department}&blocked_ne=true`;
        await store.dispatch("setStaffs", { qs: qs });
      }
    }

    //Filter Query Fetch
    let userId = store.state.auth.user.id;
    let deptId = store.state.auth.user.department;
    let queryString = "";
    if (
      store.state.auth.user.userType === "Faculty" ||
      store.state.auth.user.userType === "Student"
    ) {
      queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
      // console.log(queryString);
      await store.dispatch("program/setProgrammesData", { qs: queryString });
    } else {
      queryString = `department.id=${deptId}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
      await store.dispatch("program/setProgrammesData", { qs: queryString });
    }
  },
  computed: {
    ...mapState({
      programmesData: state => state.programmesData
    })
  },
  async mounted() {
    this.reloadData();
  },
  methods: {
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async reloadData() {
      this.loading = true;
      let deptId = this.$store.state.user.userProfile.result.departmentId;
      let userId = this.$store.state.user.userProfile.result.userId;
      let queryString = "";

      if (
        this.$store.state.auth.user.userType === "Faculty" ||
        this.$store.state.auth.user.userType === "Student"
      ) {
        queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${this.store.state.selectedYear}`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString
        });
      } else {
        queryString = `department.id=${deptId}&annual_year=${this.$store.state.selectedYear}&deleted_ne=true`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
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
</style>
