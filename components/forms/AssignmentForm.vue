<template>
  <div>
    <v-row no-gutters>
      <v-col cols="11" lg="11">
        <v-select
          v-model="assignment.user"
          :items="dataFrom"
          item-value="id"
          item-text="fullname"
          outlined
          label="Data collected From?"
          placeholder="Select Faculty / Staff from the List"
          color="success"
          :rules="[v => !!v || 'Item is required']"
        ></v-select>
      </v-col>
      <v-col cols="1" lg="1" sm="1">
        <AddUser @new-user="getLatestUsers()" @new-student="getLatestStudents()" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="assignment.faculty_name"
                :rules="[v => !!v || 'Item is required']"
                label="Faculty Name(s) *"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="assignment.classification"
                :rules="[v => !!v || 'Item is required']"
                :items="classifications"
                item-text="name"
                item-value="value"
                label="Classification *"
              ></v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="assignment.roles"
                :rules="[v => !!v || 'Item is required']"
                label="Roles *"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="assignment.designation"
                :rules="[v => !!v || 'Item is required']"
                label="Designation *"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="assignment.brief_report"
                :rules="[v => !!v || 'Item is required']"
                counter="1000"
                maxlength="1000"
                hint="Only 1000 Characters are allowed."
                label="Brief Report *"
              ></v-textarea>
            </v-col>
          </v-row>
          <span style="color:red; font-size:12px;">* Mandatory fields</span>
          <v-row>
            <v-col cols="12" lg="4">
              <h3><span class="frm-title">Upload Images (If any)</span></h3>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-img
                    :src="`${$axios.defaults.baseURL}${image_url}`"
                    lazy-src="/image_placeholder.png"
                    class="mt-3"
                    max-width="100%"
                    max-height="175"
                  >
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#00564c">
                        <v-btn @click="$refs.image.click()">
                          Upload Image
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </template>
              </v-hover>
              <input
                ref="image"
                type="file"
                style="display:none;"
                label="File input"
                @change="handleFileUpload"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn medium color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn medium color="#57a727" dark @click="assignmentAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import AddUser from "@/components/forms/AddUser";
export default {
  props: ["dataFrom", "section"],
  components: {
    AddUser
  },
  data: () => ({
    loading: false,
    date: false,
    valid: true,
    assignment: {
      annual_year: 0,
      classification: "",
      roles: "",
      faculty_name: "",
      designation: "",
      brief_report: "",
      approval_status: "Pending",
      approved_by: null,
      approved_date: null,
      deleted: false,
      department: 0,
      image: null,
      user: 0
    },
    selectedFile: null,
    image_url: null,
    classifications: ["International", "National", "NotApplicable", "Others"]
  }),
  methods: {
    getLatestUsers() {
      console.log("recieving....");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      this.$store.dispatch("setStaffs", { qs: queryString });
      this.dataFrom = this.$store.state.staffs;
    },
     getLatestStudents() {
      console.log("recieving...");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=STUDENT&blocked_ne=true`;
      this.$store.dispatch("setStudents", { qs: queryString });
      this.dataFrom = this.$store.state.students;
    },
    reset() {
      this.$refs.form.reset();
      this.image_url = null;
    },
    async assignmentAdd () {
			if (this.$refs.form.validate()) {
				this.assignment.annual_year = this.$store.state.selectedYear;
				if (this.assignment.user == 0)
					this.assignment.user = this.$store.state.auth.user.id;

				if(this.$store.state.auth.user.userType==='DEPARTMENT') {
					var today = new Date();
          this.assignment.approved_date = this.$moment(today).format();
          this.assignment.approval_status = 'Approved';
				}	
				this.assignment.department = this.$store.state.auth.user.department;
				var payload = this.assignment;
				// console.log(payload);
				var vm = this;
				await this.$store.dispatch('assignment/assignmentAdd', payload)
					.then(resp => {
						Swal.fire({
							title: 'Success',
							text: 'Added Successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reset();
					})
					.catch(err => {
						Swal.fire('Something wrong!')
					});
			}
		},
    async handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
      const data = new FormData();
      data.append("files", this.selectedFile);
      const uploadRes = await this.$axios({
        method: "POST",
        url: "/upload",
        data
      });
      this.image_url = uploadRes.data[0].url;
      this.assignment.image = uploadRes.data[0].id;
    }
  }
};
</script>
