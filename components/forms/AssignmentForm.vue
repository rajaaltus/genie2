<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12"
        sm="12"
        md="12"
      >
      </v-col>
      <v-col cols="12" md="12">
        <v-select
          v-model="assignment.userProfileId"
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
              <v-col cols="6">
                <v-select
                  v-model="assignment.classifcation"
                  :items="classifications"
                  item-text="name"
                  item-value="value"
                  label="Classification"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="assignment.roles"
                  label="Roles"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="assignment.userProfileId"
                  :items="staffs"
                  item-text="firstname"
                  item-value="id"
                  label="Faculty Name"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="assignment.designation"
                  label="Designation"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="assignment.briefReport"
                  counter
                  label="Brief Report"
                  :value="value"
                ></v-textarea>
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
		date: false,
		valid: true,
    assignment: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			briefReport: "",
			classifcation: "",
			departmentId: 0,
			designation: "",
			rejectedReason: "",
			roles: "",
			status: "VALID",
			userProfileId: 0
		},
    classifications: [
			{
				value: 'INTERNATION',
				name: 'International'
			 },
			 {
				value: 'NATIONAL',
				name: 'National'
			 },
			 {
				value: 'NOT_APPLICABLE',
				name: 'Not Applicable'
			 },
			 {
				value: 'OTHERS',
				name: 'Others'
			 },
		],
		approvals: ['PENDING', "REJECTED", 'APPROVED'],
  })
}
</script>
