<template>
  <div>
    <YearDialog v-if="$store.state.selectedYear==0"/>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
      class="ml-0 pb-0 pt-0"
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
    <v-row>
      <v-col cols="12">
        <ClinicalTable :reportYears="reportYears" :annualYear="$store.state.selectedYear" :clinicalData="$store.state.clinical.clinicalData"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import YearDialog from '@/components/YearDialog'
import PatientCare from '@/components/PatienCare'
import ClinicalForm from  '@/components/forms/patient-care/ClinicalForm'
import ClinicalTable from '@/components/tables/PatientCare/ClinicalTable'
export default {
  head() {
    return {
      title: 'Patient Care Activities'
    }
  }, 
  components: {
    PageHeader,
    YearDialog,
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
  }),
  
} 
</script>