<template>
  <div>
    <v-row no-gutters>
      <v-col cols="11" lg="11">
        <v-select
          v-model="training.user"
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
        <AddUser @new-user="getLatestUsers()" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="training.faculty_name"
                  :rules="[v => !!v || 'Item is required']"
                  label="Faculty Name(s) *"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="training.program_name"
                  :rules="[v => !!v || 'Item is required']"
                  label="Name of the Program *"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="training.institutional_affiliation"
                  :rules="[v => !!v || 'Item is required']"
                  label="Institution &amp; Place *"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-menu
                  ref="menu"
                  v-model="duration_from"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="training.from_date"
                      :return-value.sync="date"
                      :rules="[v => !!v || 'Item is required']"
                      readonly
                      label="From Date *"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="training.from_date"
                    color="green lighten-1"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="duration_from = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
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
                      v-model="training.to_date"
                      :rules="[v => !!v || 'Item is required']"
                      :return-value.sync="date1"
                      readonly
                      label="To Date *"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="training.to_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="duration_to = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(date1)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="training.funded_by"
                  :rules="[v => !!v || 'Item is required']"
                  label="Funded By *"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-container fluid>
                <v-textarea
                  v-model="training.brief_report"
                  counter="1000"
                  maxlength="1000"
                  :rules="[v => !!v || 'Item is required']"
                  hint="Only 1000 Characters are allowed."
                  label="Brief Report *"
                ></v-textarea>
                <span style="color:red; font-size:12px;"
                  >* Mandatory fields</span
                >
              </v-container>
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
          <v-row>
            <v-spacer></v-spacer>
            <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
              Reset
            </v-btn>
            <v-btn small color="#57a727" dark @click="trainingAdd" class="mr-4">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
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
    training: 
		{
			annual_year: 0,
			faculty_name: "",
			program_name: "",
			institutional_affiliation: "",
			from_date: "",
			to_date: "",
			funded_by: "",
			brief_report: "",
			approval_status: "Pending",
			approved_by: null,
			approved_date: null,
      deleted: false,
      image: null,
			department: 0,
			user: 0
    },
    selectedFile: null,
    image_url: null,
  }),
  methods: {
    getLatestUsers() {
      console.log("recieving....");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      this.$store.dispatch("setStaffs", { qs: queryString });
      this.dataFrom = this.$store.state.staffs;
    },
    reset() {
      this.$refs.form.reset();
      this.image_url = null;
    },
    async trainingAdd () {
			if (this.$refs.form.validate()) {
				this.training.annual_year = this.$store.state.selectedYear;
				if (this.training.user == 0)
					this.training.user = this.$store.state.auth.user.id;
				if(this.$store.state.auth.user.userType==='DEPARTMENT') {
					var today = new Date();
          this.training.approved_date = this.$moment(today).format();
          this.training.approval_status = 'Approved';
				}
				this.training.department = this.$store.state.auth.user.department;
				var payload = this.training;
				//  console.log(payload);
				this.$store.dispatch('training/addTraining', payload)
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
						Swal.fire('Something Wrong!')
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
      this.training.image = uploadRes.data[0].id;
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
