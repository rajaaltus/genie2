<template>
  <div>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          v-model="program.user"
          :items="staffs"
          item-value="id"
          item-text="firstname"
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
          <v-text-field v-model="program.name"
            :rules="[v => !!v || 'Item is required']"
            label="Program Name*"
            required
          >
          </v-text-field>
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
            v-model="from_date"
            :rules="[v => !!v || 'Item is required']"
            :close-on-content-click="true"
            :nudge-right="40"
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
            v-model="to_date"
            :rules="[v => !!v || 'Item is required']"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
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
        <v-container fluid>
          <v-textarea
            v-model="program.brief_report"
            counter
            label="Brief Report"
            :value="value"
          ></v-textarea>
        </v-container>
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
export default {
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
      rejected_reason: null
    },
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
    },
    async programAdd () {
			if (this.$refs.form.validate()) {
				this.program.annual_year = this.$store.state.selectedYear;
				this.program.department = this.$store.state.auth.user.department;
				if (this.program.user == 0)
          this.program.user = this.$store.state.auth.user.id;
        if (this.$store.state.auth.user.role.id==4)
          this.program.approval_status = 'Approved';
				var payload = this.program;
				// console.log(payload)
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
  }
}
</script>