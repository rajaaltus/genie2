<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12"
        sm="12"
        md="12"
      >
        <h3 class="mb-4"><span class="frm-title">Specific training underwent by the Faculty / Staff / Students outside NIMHANS</span></h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-select
          v-model="training.userProfileId"
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
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field v-model="training.facultyName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Faculty Name*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="training.trainingName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Name of the Program*"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="training.institutionAndPlace"
                  :rules="[v => !!v || 'Item is required']"
                  label="Institution &amp; Place*"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-menu
                  v-model="duration_from"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="training.fromDate"
                      label="From Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="training.fromDate" color="green lighten-1" @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-menu
                  v-model="duration_to"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="training.toDate"
                      label="To Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="training.toDate" color="green lighten-1" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="training.fundedBy"
                  label="Funded By"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          
            <v-row>
              <v-container fluid>
                <v-textarea
                  v-model="training.briefReport"
                  counter
                  label="Brief Report"
                  :value="value"
                ></v-textarea>
              </v-container>
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
      <v-btn medium color="#57a727" dark @click="programAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
		loading: false,
		duration_from: false,
		duration_to: false,
    valid: false,
    training: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			briefReport: "",
			departmentId: 0,
			facultyName: "",
			fromDate: new Date().toISOString().substr(0, 10),
			fundedBy: "",
			institutionAndPlace: "",
			rejectedReason: "",
			status: "VALID",
			toDate: new Date().toISOString().substr(0, 10),
			trainingName: "",
			userProfileId: 0
    },
    approvals: ['PENDING', "REJECTED", 'APPROVED']
  })
}
</script>

<style scoped>
	.frm-title
	{
		padding: 0 0 0 10px;
		border-left: 5px solid #e1782b;
	}
</style>