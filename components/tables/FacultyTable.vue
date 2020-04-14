<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="facultyData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:item.approval_status="{ item }">
        <v-chip :color="getColor(item.approval_status)" dark>
          {{ item.approval_status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
          color="#ebebeb"
          class="d-flex justify mt-4 pt-1"
          style="border-radius:0;"
        >
          <v-toolbar-title
            ><span class="frm-title"
              >Faculty and Staff served NIMHANS</span
            ></v-toolbar-title
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
            <v-card flat>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Faculty and Staff served NIMHANS</v-toolbar-title
                >
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
                      <v-text-field
                        v-model="editedItem.faculty_name"
                        label="Name of the official"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="editedItem.faculty_status"
                        :items="facultyStatus"
                        label="Status"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="editedItem.designation"
                        label="Designation"
                      ></v-text-field>
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
                  color="green"
                  v-model="editedItem.leaving_date"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="date1"
                  readonly
                  label="To Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.leaving_date" no-title scrollable>
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
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon centre @click="editItem(item)" color="green"
          >mdi-pencil-box</v-icon
        >
        <v-icon centre @click="deleteItem(item)" color="error"
          >mdi-delete-circle</v-icon
        >
      </template>
      <template v-slot:no-data>
        <v-btn color="green" @click="reloadData">
          Reload
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["reportYears", "annualYear", "facultyData"],
  data: () => ({
    editFrom: false,
    loading: false,
    facultyStatus: ["Superannuated", "Retired", "VRS"],
    editedItem: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0
    },
    deletedItem: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0
    },
    dialog: false,
    //Data table header
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at"
      },

      { text: "Status", value: "faculty_status" },
      { text: "Name", value: "faculty_name" },
      { text: "Designation", value: "designation" },
      { text: "Leaving date", value: "leaving_date" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      success: state => state.faculty.facultyData.status,
      facultyData: state => state.faculty.facultyData.result,
      errorData: state => state.faculty.facultyData.error
    })
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      this.$store.dispatch("faculty/setFacultyData", { qs: queryString });
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.facultyData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.facultyData.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      // confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      console.log(payload);
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("faculty/updateFaculty", payload)
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
        this.facultyData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.program[this.editedIndex], this.editedItem)
        var payload = this.editedItem;
        console.log(payload);
        this.$store
          .dispatch("faculty/updateFaculty", payload)
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
        console.log(this.facultyData.push(this.editedItem));
      }
      this.close();
    }
  }
};
</script>

<style scoped>
.frm-title {
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>
