<template>
  <div>
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
        <ClinicalForm />
      </v-col>
    </v-row>
    <hr color="lightGrey" class="my-4">
    <v-row>
      <v-col cols="12">
        <ClinicalTable :reportYears="reportYears" :annualYear="$store.state.selectedYear" :clinicalData="$store.state.clinical.clinicalData"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PatientCare from '@/components/PatienCare'
import ClinicalForm from  '@/components/forms/patient-care/ClinicalForm'
import ClinicalTable from '@/components/tables/PatientCare/ClinicalTable'
export default {
  head() {
    return {
      title: 'Patient Care Activities - Clinical'
    }
  }, 
  components: {
    PageHeader,
    PatientCare,
    ClinicalForm,
    ClinicalTable
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