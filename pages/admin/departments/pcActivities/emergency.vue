<template>
  <v-app>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
    />
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <PatientCare />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <EmergencyForm />
      </v-col>
    </v-row>
    <hr color="lightGrey" class="my-4">
    <v-row>
      <v-col cols="12">
        <EmergencyTable :reportYears="reportYears" :annualYear="$store.state.selectedYear" :emergencyData="$store.state.emergency.emergencyData"/>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PatientCare from '@/components/PatienCare'
import EmergencyForm from '@/components/forms/patient-care/EmergencyForm'
import EmergencyTable from '@/components/tables/PatientCare/EmergencyTable'
export default {
  head() {
    return {
      title: 'Patient Care Activities - Emergency'
    }
  }, 
  components: {
    PageHeader,
    PatientCare,
    EmergencyForm,
    EmergencyTable
  },
  data: () => ({
    reportYears: [
      {
        id: 2017,
        val: "2017-2018"
      },
      {
        id: 2018,
        val: "2018-2019"
      },
      {
        id: 2019,
        val: "2019-2020"
      },
      {
        id: 2020,
        val: "2020-2021"
      }
    ],
    selectedYear: 0,
  })
} 
</script>