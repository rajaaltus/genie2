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
          v-model="patent.userProfileId"
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
                <v-text-field v-model="patent.patentName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Patent Filed / Title*"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="patent.patentOffice"
                  :rules="[v => !!v || 'Item is required']"
                  label="Registration / Application No*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="patent.patentStatus"
                  :items="patentStatus"
                  item-text="text"
                  item-value="value"
                  label="Patent Status*"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="patent.briefReport"
                  label="Brief Report"
                  :value="value"
                  counter="250"
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
    patent: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			briefReport: "",
			departmentId: 0,
			patentName: "",
			patentOffice: "",
			patentStatus: 0,
			rejectedReason: "",
			status: "VALID",
			userProfileId: 0
    },
    patentStatus: [
		 { text: 'Yes', value: 1 },
		 { text: 'No', value: 0 }
		],
		approvals: ['PENDING', "REJECTED", 'APPROVED'],
  })
}
</script>
