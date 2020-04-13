<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8">
        <h2><span class="frm-title">Retired Employees</span></h2>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="faculty.faculty_status"
              :rules="[v => !!v || 'Item is required']"
              label="Status*"
              :items="facultyStatus"
            >
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="faculty.faculty_name"
              :rules="[v => !!v || 'Item is required']"
              label="Name of the Official*"
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="faculty.designation"
              :rules="[v => !!v || 'Item is required']"
              label="Designation*"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-menu
              ref="menu1"
              v-model="duration_to"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="faculty.leaving_date"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="date1"
                  readonly
                  label="To Date *"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="faculty.leaving_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="duration_to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn medium color="#d74f4f" dark class="mr-2" @click="reset">
          Reset
        </v-btn>
        <v-btn medium color="#57a727" dark @click="addFaculty">
          Add
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  data: () => ({
    duration_from: false,
    valid: false,
    faculty: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0
    },
    facultyStatus: ["Superannuated", "Retired", "VRS"]
  }),
  methods: {
    async addFaculty() {
      if (this.$refs.form.validate()) {
        this.faculty.annual_year = this.$store.state.selectedYear;
        this.faculty.department = this.$store.state.auth.user.department;
        var payload = this.faculty;
        // console.log(payload);
        this.$store
          .dispatch("faculty/addFaculty", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reset();
            this.reloadData();
          })
          .catch(err => {
            this.snackbar = true;
            this.submitMessage = err;
          });
      }
    },
    reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
      this.$store.dispatch("faculty/setFacultyData", { qs: queryString });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
