<template>
  <div>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          v-model="program.user"
          :items="dataFrom"
          item-value="id"
          item-text="fullname"
          filled
          label="Data from (Select Faculty)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
        <v-row>
        <v-col cols="4">
          <v-select
            v-model="program.type"
            :rules="[v => !!v || 'Item is required']"
            :items="programTypes"
            label="Program Type*"
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-combobox v-model="program.name"
            :rules="[v => !!v || 'Item is required']"
            :items="programNames"
            item-text="name"
            item-value="name"
            label="Program Name*"
            required
          >
          </v-combobox>
        </v-col>
        </v-row>
        <v-row>
        <v-col cols="4">
          <v-select
            v-model="program.location"
            :rules="[v => !!v || 'Item is required']"
            :items="locations"
            label="Location*"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="program.forum"
            :rules="[v => !!v || 'Item is required']"
            :items="programLevels"
            label="Forum*"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="program.colloborations"
            :items="colloborations"
            label="Colloborations"
          ></v-select>
        </v-col>
      </v-row>
     <v-row>
        <v-col cols="4">
          <v-menu
            v-model="duration_from"
            :rules="[v => !!v || 'Item is required']"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="program.from_date"
                label="From Date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="program.from_date" color="green lighten-1" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-menu
            v-model="duration_to"
            :rules="[v => !!v || 'Item is required']"
            transition="scale-transition"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="program.to_date"
                label="To Date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="program.to_date" color="green lighten-1" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="program.participants_count"
            :rules="[v => !!v || 'Item is required']"
            type="number"
            label="Participants Count*"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="program.coordinators"
            label="Co-ordinators"
            :rules="[v => !!v || 'Item is required']"
          ></v-text-field>
        </v-col> 
        </v-row>
        <v-row>
          <v-col cols="6" md="6" sm="12">
            <v-container fluid>
              <v-textarea
                v-model="program.brief_report"
                counter
                label="Brief Report"
              ></v-textarea>
            </v-container>
          </v-col>
          <v-col cols="6" md="6" sm="12">
            <input type="file" style="display:none;" label="File input" ref="image"  @change="handleFileUpload">
            <v-img
              :src="`${$axios.defaults.baseURL}${this.image_url}`"
              lazy-src="/image_placeholder.png"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="100%"
              max-height="175"
            >
            <v-btn small color="success" dark @click="$refs.image.click()">Upload Image</v-btn>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                </v-row>
              </template>
            </v-img>
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
      <v-btn medium color="#57a727" dark @click="programAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import {mapState} from 'vuex'
export default {
  props: ['programNames', 'dataFrom'],
  data: () => ({
    duration_from: false,
		duration_to: false,
		valid: true,
    program: 
		{
      annual_year: 0,
      type: "",
      name: "",
      location: "",
      forum: "",
      colloborations: "",
      from_date: "",
      to_date: "",
      participants_count: 0,
      coordinators: "",
      brief_report: "",
      deleted: false,
      approval_status: "Pending",
      approved_by: "",
      department: 0,
      user: 0,
      rejected_reason: null,
      image: 0
    },
    selectedFile: null,
    image_url: null,
    programTypes: [
			'Conference',
			'Workshop',
			'Seminar',
			'Symposium',
			'Scientific'
		],
		programLevels: [
			'International',
			'National',
			'Regional',
			'State',
			'Local'
		],
		locations: ['NIMHANS', 'OUTSIDE_NIMHANS'],
		colloborations: ['Departmental', 'Interdepartmental'],
		approvals: ['Pending', "Rejected", 'Approved'],
  }),
  
  methods: {

    reset () {
      this.$refs.form.reset();
      this.image_url = null;
    },
    async programAdd () {
			if (this.$refs.form.validate()) {
				this.program.annual_year = this.$store.state.selectedYear;
				this.program.department = this.$store.state.auth.user.department;
				if (this.program.user == 0)
          this.program.user = this.$store.state.auth.user.id;
        if (this.$store.state.auth.user.userType==='DEPARTMENT')
          this.program.approval_status = 'Approved';
        if (typeof this.program.name === 'object')
          this.program.name = this.program.name.name
				var payload = this.program;
				console.log(payload)
			 	this.$store.dispatch('program/addProgram', payload)
					.then(resp => {
						Swal.fire({
							title: 'Success',
							text: 'Added Successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reset();
						this.reloadData();
					})
					.catch(err => {
            Swal.fire({
              title: 'Something Wrong!',
              text: err,
              icon: 'warning',
              showConfirmButton: false,
							timer: 4500
            })
					});
			}
    },
    async reloadData () {
			this.loading = true;
			let deptId = this.$store.state.auth.user.department;
			let userId = this.$store.state.auth.user.id;
			let queryString = '';
			
			if (this.$store.state.auth.user.userType==='Faculty' || this.$store.state.auth.user.userType==='Student') {
			 queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			else {
				queryString = `department.id=${deptId}&annual_year=${this.$store.state.selectedYear}&deleted_ne=true`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			this.loading = false;
    },
    async handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
      const data = new FormData()
      data.append('files', this.selectedFile);
      const uploadRes = await this.$axios({
        method: 'POST',
        url: '/upload',
        data
      })
      this.image_url = uploadRes.data[0].url;
      this.program.image = uploadRes.data[0].id;
    }
  }
}
</script>