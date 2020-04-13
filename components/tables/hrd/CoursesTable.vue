<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="hrdCourses"
      sort-by="last_updated"
      sort-desc
      dense
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify pt-1">
          <v-toolbar-title
            ><span class="frm-title">Academic Courses</span></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Select Year"
            class="justify-end mt-6"
            @change="reloadData()"
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="#4da96b">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>HRD - Academic Courses</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn dark text @click="save">
                    Save
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select
                        v-model="editedItem.course_name"
                        :items="courses"
                        item-text="text"
                        item-value="val"
                        label="Course Name"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="12" lg="9">
                      <v-text-field
                        v-if="editedItem.course_name === 'Others'"
                        v-model="editedItem.other_name"
                        label="Specify Course Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="3">
                      <v-text-field
                        v-model="editedItem.candidate_name"
                        label="Candidate Name"
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12">
														<v-text-field v-model="editedItem.instituteAffiliation" label="Institute Affiliation"></v-text-field>
													</v-col>-->
                    <v-col cols="12" md="12" lg="2">
                      <v-text-field
                        v-model="editedItem.durations"
                        label="Duration"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        v-model="editedItem.thesis_title"
                        label="Thesis Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.guides"
                        label="Guides"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" md="3" lg="3">
                      <v-select
                        v-model="editedItem.remarks_status"
                        :items="remarks"
                        label="Status"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon right @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon right @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
         <v-btn color="primary" @click="reloadData">
          Reload
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["reportYears", "annualYear", "clincalData"],
  data: () => ({
    loading: false,
    editedItem: {
      annual_year: 0,
      course_name: "",
      other_name: "",
      candidate_name: "",
      durations: 0,
      thesis_title: "",
      guides: "",
      remarks_status: "",
      deleted: false,
      department: 0
    },
    deletedItem: {
      annual_year: 0,
      course_name: "",
      other_name: "",
      candidate_name: "",
      durations: 0,
      thesis_title: "",
      guides: "",
      remarks_status: "",
      deleted: false,
      department: 0
    },
    courses: [
      {
        text: "Post Doctoral Fellow",
        val: "Post_Doctoral_Fellow"
      },
      {
        text: "Phd",
        val: "PhD"
      },
      {
        text: "DM / MCH",
        val: "DM_or_MCH"
      },
      {
        text: "MPhil",
        val: "MPhil"
      },
      {
        text: "MSc",
        val: "MSc"
      },
      {
        text: "Others",
        val: "Others"
      }
    ],
    remarks: ["Completed", "Awarded", "Submitted", "Ongoing", "Joined"],
    dialog: false,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at",
        width: "500",
        fixed: true
      },
      { text: "Course", value: "course_name", width: "600", fixed: true },
      { text: "Candidate Name", value: "candidate_name" },
      { text: "Duration", value: "durations" },
      { text: "Thesis Title", value: "thesis_title" },
      { text: "Status", value: "remarks_status" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
   
  },
  
  computed: {
    ...mapState({
      hrdCourses: state => state.hrdCourse.hrdCourses.result
    })
  },
  methods: {
    reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      this.$store.dispatch("hrdCourse/setHRDCourses", { qs: queryString });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },

    editItem(item) {
      this.editedIndex = this.hrdCourses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.hrdCourses.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("hrdCourse/updateHRDCourse", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reloadData();
          })
          .catch(err => {
            this.snackbar = true;
            this.submitMessage = err;
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.hrdCourses = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.program[this.editedIndex], this.editedItem)
        var payload = this.editedItem;
        console.log(payload);
        var vm = this;
        this.$store
          .dispatch("hrdCourse/updateHRDCourse", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reloadData();
          })
          .catch(err => {
            this.snackbar = true;
            this.submitMessage = err;
          });
      } else {
        // this.program.push(this.editedItem)
        console.log(this.hrdCourses.push(this.editedItem));
      }
      this.close();
    }
  }
};
</script>
