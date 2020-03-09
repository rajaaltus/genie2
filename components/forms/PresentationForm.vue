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
          v-model="presentation.userProfileId"
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
                  v-model="presentation.contributionType"
                  :rules="[v => !!v || 'Item is required']"
                  :items="contributionType"
                  label="Type of Contribution*"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="presentation.forumType"
                  :rules="[v => !!v || 'Item is required']"
                  :items="forum"
                  label="Forum*"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="presentation.facultyName"
                  :rules="[v => !!v || 'Item is required']"
                  label="Faculty Name*"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="coAuthors"
                  label="Co-authors"
                  :rules="[v => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="presentation.title"
                  :rules="[v => !!v || 'Item is required']"
                  label="Title*"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-container fluid>
                <v-textarea
                  v-model="presentation.reference"
                  label="Reference"
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
    presentation: 
		{
			annualYear: 0,
			approvalStatus: "PENDING",
			approvedBy: "",
			approvedDate: "",
			coAuthors: "",
			contributionType: "",
			departmentId: 0,
			facultyName: "",
			forumType: "",
			presentationDate: "",
			reference: "",
			rejectedReason: "",
			status: "VALID",
			title: "",
			userProfileId: 0
		},
    approvals: ['PENDING', "REJECTED", 'APPROVED'],
    contributionType: ['PRESENTATION', 'POSTER'],
		forum: ['NATIONAL', 'INTERNATIONAL'],
  })
}
</script>
