<template>
  <div>
    <v-container fluid>
      <v-row class="pr-4">
        <v-col cols="12" lg="3">
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
            @change="fetchData"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="3"
          lg="2"
          v-for="department in departments"
          :key="department"
        >
          <DepartmentCard
            :selectedYear="selectedYear"
            :department="department"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DepartmentCard from "@/components/SuperAdmin/DepartmentCard";
export default {
  layout: "super",
  components: {
    DepartmentCard,
  },
  data() {
    return {
      selectedYear: 0,
      cardColor: "white",
      dark: false,
      available: "default",
    };
  },
  computed: {
    ...mapState({
      departments: (state) => state.user.departments.result,
    }),
    reportYears() {
      return this.$store.state.reportYears;
    },
  },
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  methods: {
     fetchData() {
      console.log(this.selectedYear)
      this.$store.dispatch("user/getAllDepartment");
    }
  }
};
</script>
