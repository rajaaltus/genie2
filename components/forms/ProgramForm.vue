<template>
  <div>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          v-model="program.userProfileId"
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
            v-model="program.level"
            :rules="[v => !!v || 'Item is required']"
            :items="programLevels"
            label="Forum*"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="program.colloboration"
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
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="program.durationFrom"
                label="From Date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="program.durationFrom" color="green lighten-1" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-menu
            v-model="duration_to"
            :rules="[v => !!v || 'Item is required']"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="program.durationTo"
                label="To Date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="program.durationTo" color="green lighten-1" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="program.participantsCount"
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
            v-model="program.briefReport"
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
export default {
  data: () => ({
    duration_from: false,
		duration_to: false,
		valid: true,
    program: 
		{
			annualYear: 0,
			type: "",
			name: "",
			location: "",
			level: "",
			colloboration: "",
			durationFrom: new Date().toISOString().substr(0, 10),
			durationTo: new Date().toISOString().substr(0, 10),
			coordinators: "",
			participantsCount: 0,
			briefReport: "",
			status: "VALID",
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			rejectedReason: "",
			departmentId: 0,
			userProfileId: 0
    },
    programTypes: [
			'CONFERENCE',
			'WORKSHOP',
			'SEMINAR',
			'SYMPOSIUM',
			'SCIENTIFIC'
		],
		programLevels: [
			'INTERNATIONAL',
			'NATIONAL',
			'REGIONAL',
			'STATE',
			'LOCAL'
		],
		locations: ['NIMHANS', 'OUTSIDE_NIMHANS'],
		colloborations: ['DEPARTMENTAL', 'INTERDEPARTMENTAL'],
		approvals: ['PENDING', "REJECTED", 'APPROVED'],
  }),
  methods: {
    reset () {
			this.$refs.form.reset();
		},
  }
}
</script>