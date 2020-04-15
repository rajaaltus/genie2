<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-select
        color="green"
          v-model="visitor.userProfileId"
          :items="staffs"
          item-value="id"
          item-text="firstname"
          filled
          label="Data from (Select Faculty)"
          :rules="[v => !!v || 'Item is required']"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                 color="green"
                  v-model="visitor.name"
                  label="Visitor Name"
                  :rules="[v => !!v || 'Item is required']"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                 color="green"
                  v-model="visitor.designation"
                  label="Designation"
                  :rules="[v => !!v || 'Item is required']"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                color="green"
                  v-model="visitor.institutionAffiliation"
                  label="Institute Affiliation"
                  :rules="[v => !!v || 'Item is required']"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                color="green"
                  v-model="visitor.lectureTitle"
                  label="Lecture Title"
                  :rules="[v => !!v || 'Item is required']"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="duration_from"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                    color="green"
                      v-model="visitor.fromDate"
                      label="From Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="visitor.fromDate"
                    color="green lighten-1"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="duration_to"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                    color="green"
                      v-model="visitor.toDate"
                      label="To Date"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="visitor.toDate"
                    color="green lighten-1"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-container fluid>
                <v-textarea
                  v-model="visitor.briefReport"
                  counter="250"
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
      <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn small color="#57a727" dark @click="programAdd" class="mr-4">
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
    visitor: {
      annualYear: 0,
      approvalStatus: "PENDING",
      approvedBy: "",
      approvedDate: "",
      briefReport: "",
      departmentId: 0,
      designation: "",
      fromDate: new Date().toISOString().substr(0, 10),
      institutionAffiliation: "",
      lectureTitle: "",
      name: "",
      rejectedReason: "",
      status: "VALID",
      toDate: new Date().toISOString().substr(0, 10),
      userProfileId: 0
    },
    approvals: ["PENDING", "REJECTED", "APPROVED"]
  })
};
</script>
