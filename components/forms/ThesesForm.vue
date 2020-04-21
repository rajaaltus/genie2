<template>
  <div>
    <v-row no-gutters>
      <v-col cols="11" lg="11">
        <v-select
          v-model="theses.user"
          :items="dataFrom"
          item-value="id"
          item-text="fullname"
          outlined
          label="Data collected From?"
          placeholder="Select Student from the List"
          color="success"
          :rules="[v => !!v || 'Item is required']"
        ></v-select>
      </v-col>
      <v-col cols="1" lg="1" sm="1">
        <AddUser @new-student="getLatestStudents()" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="theses.student_name"
                  :rules="[v => !!v || 'Item is required']"
                  label="Name of the Student *"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="theses.thesis_title"
                  :rules="[v => !!v || 'Item is required']"
                  label="Thesis / Dissertation Title*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="theses.guide"
                  :rules="[v => !!v || 'Item is required']"
                  label="Guide*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="theses.coguides"
                  :rules="[v => !!v || 'Item is required']"
                  label="Co Guides*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="theses.status"
                  :rules="[v => !!v || 'Item is required']"
                  :items="thesesStatus"
                  label="Status"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="theses.funding"
                  :rules="[v => !!v || 'Item is required']"
                  :items="thesesFunding"
                  label="Funding"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="theses.brief_report"
                  :rules="[v => !!v || 'Item is required']"
                  counter="1000"
                  maxlength="1000"
                  hint="Only 1000 Characters are allowed."
                  label="Brief Report"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="4" md="12">
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
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn medium color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn medium color="#57a727" dark @click="thesesAdd" class="mr-4">
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
  props: ["dataFrom"],
  components: {
    AddUser
  },
  data: () => ({
    dataFrom: [],
    loading: false,
    duration_from: false,
    duration_to: false,
    valid: false,
    theses: {
      annual_year: 0,
			thesis_title: "",
			student_name: "",
			guide: "",
			coguides: "",
			status: "",
			funding: "",
			brief_report: "",
			approval_status: "Pending",
			approved_by: null,
			approved_date: null,
			deleted: false,
			department: 0,
      user: 0,
      image: null,
      rejected_reason: null
    },
    selectedFile: null,
    image_url: null,
    thesesStatus: ['Submitted', 'Ongoing', "New"],
		thesesFunding: ['Non_Funded', 'Part_of_Large_Fund'],
  }),
  methods: {
    
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
    async thesesAdd() {
      if (this.$refs.form.validate()) {
        this.theses.annual_year = this.$store.state.selectedYear;
        if (this.theses.user == 0)
          this.theses.user = this.$store.state.auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.theses.approved_date = this.$moment(today).format();
          this.theses.approval_status = "Approved";
        }
        this.theses.department = this.$store.state.auth.user.department;
        var payload = this.theses;
        //  console.log(payload);
        this.$store
          .dispatch("theses/thesesAdd", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reset();
          })
          .catch(err => {
            Swal.fire("Something Wrong!");
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
      this.theses.image = uploadRes.data[0].id;
    }
  }
};
</script>

<style scoped>
.frm-title {
  padding: 0 0 0 10px;
  border-left: 5px solid #e1782b;
}
</style>