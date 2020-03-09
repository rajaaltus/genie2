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
          v-model="publicEngagement.userProfileId"
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
                <v-select
                  v-model="publicEngagement.activityType"
                  :rules="[v => !!v || 'Item is required']"
                  :items="activityTypes"
                  label="Type of Activity*"
                ></v-select>
              </v-col>
              <v-col v-if="publicEngagement.activityType==='OTHERS'" cols="4">
                <v-text-field v-model="publicEngagement.activityName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Activity Name"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="publicEngagement.facultyName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Faculty Name"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="publicEngagement.title"
                  :rules="[v => !!v || 'Item is required']"
                  label="Title"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="publicEngagement.programName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Program Name"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="publicEngagement.targetAudience"
                  :rules="[v => !!v || 'Item is required']"
                  label="Target Audience"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="date"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="publicEngagement.date"
                      label="Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="publicEngagement.date" color="green lighten-1" @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="publicEngagement.place"
                  label="Place"
                  required
                >
                </v-text-field>
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
    publicEngagement: 
		{
			activityName: "",
			activityType: "",
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			date: "",
			departmentId: 0,
			facultyName: "",
			place: "",
			programName: "",
			rejectedReason: "",
			status: "VALID",
			targetAudience: "",
			title: "",
			userProfileId: 0
		},
    approvals: ['PENDING', "REJECTED", 'APPROVED'],
    activityTypes: ['PUBLIC_LECTURE', 'MASS_MEDIA', 'OTHERS'],
  })
}
</script>
