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
          v-model="research.userProfileId"
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
              <v-col cols="12">
                <v-text-field v-model="research.projectName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Project Name / Title*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="research.investigatorType"
                  :rules="[v => !!v || 'Item is required']"
                  :items="investigatorTypes"
                  label="Investigator Type*"
                ></v-select>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="research.investigatorName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Name of the Investigator(s)*"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="research.projectTotalDuration"
                  :rules="[v => !!v || 'Item is required']"
                  label="Total Duration (in Months)"
                  required
                  type="number"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="research.fundingSource"
                  :rules="[v => !!v || 'Item is required']"
                  :items="fundingSource"
                  label="Source of Funding*"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="research.fundingAgency"
                  :rules="[v => !!v || 'Item is required']"
                  label="Funding Agency*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="research.currentYearFunding"
                  label="Total Fund (in Lakhs)*"
                  required
                  type="number"
                >
                </v-text-field>
              </v-col>
              
              <v-col cols="4">
                <v-text-field v-model="research.fundingForReviewPeriod"
                  label="Funding during the Review Period / Year in lakhs *"
                  required
                  type="number"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="research.researchStatus"
                  :items="researchStatus"
                  label="Research Status"
                ></v-select>
              </v-col>
              <!-- <v-col cols="4">
                <v-select
                  v-model="research.studentProject"
                  :items="studentProject"
                  label="Student Project?"
                ></v-select>
              </v-col> -->
              <v-col cols="12">
                <v-textarea
                  v-model="research.researchAbstract"
                  counter
                  label="Report / Abstract*"
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
		lloading: false,
		date: false,
		valid: true,
    research: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			currentYearFunding: 0,
			departmentId: 0,
			fundingAgency: "",
			fundingForReviewPeriod: 0,
			fundingSource: "",
			investigatorName: "",
			investigatorType: "",
			projectName: "",
			projectTotalDuration: 0,
			rejectedReason: "",
			researchAbstract: "",
			researchStatus: "",
			status: "VALID",
			studentProject: false,
			userProfileId: 0
		},
    fundingSource: ['INTRAMURAL', 'EXTRAMURAL', 'NON_FUNDED'],
		investigatorTypes: ['PRICIPAL_INVESTIGATORS', 'CO_INVESTIGATORS'],
		researchStatus: ['COMPLETED', 'ONGOING', "NEW"],
		approvals: ['PENDING', "REJECTED", 'APPROVED'],
		studentProject: [true, false],
  })
}
</script>
