<template>
  <v-app>
     <YearDialog v-if="$store.state.selectedYear==0"/>
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
        <DiagnosticForm />
      </v-col>
    </v-row>
    <hr color="lightGrey" class="my-4">
    <v-row>
      <v-col cols="12">
        <DiagnosticTable :reportYears="reportYears" :annualYear="$store.state.selectedYear" :diagnosticData="$store.state.diagnostic.diagnosticData"/>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import YearDialog from '@/components/YearDialog'
import PatientCare from '@/components/PatienCare'
import DiagnosticForm from '@/components/forms/patient-care/DiagnosticForm'
import DiagnosticTable from '@/components/tables/PatientCare/DiagnosticTable'
export default {
  head() {
    return {
      title: 'Patient Care Activities - Diagnostics'
    }
  }, 
  components: {
    PageHeader,
    YearDialog,
    PatientCare,
    DiagnosticForm,
    DiagnosticTable
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
  async fetch ({store}) {
		let queryString = ''
		queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
		await store.dispatch('diagnostic/setDiagnosticData', {qs: queryString});
  },
} 
</script>