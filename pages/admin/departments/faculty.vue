<template>
  <div>
    <YearDialog v-if="$store.state.selectedYear==0"/>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
    />
    <v-row>
      <v-col cols="12">
        <FacultyForm />
      </v-col>
    </v-row>
    <hr color="lightGrey" class="my-4">
    <v-row>
      <v-col cols="12">
        <FacultyTable :reportYears="reportYears" :annualYear="$store.state.selectedYear" :facultyData="$store.state.clinical.facultyData"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader'
import YearDialog from '@/components/YearDialog'
import FacultyForm from '@/components/forms/FacultyForm'
import FacultyTable from '@/components/tables/FacultyTable'
export default {
  head() {
    return {
      title: 'Faculty / Staff'
    }
  }, 
  components: {
    PageHeader,
    YearDialog,
    FacultyForm,
    FacultyTable
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
		queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true`;
		await store.dispatch('faculty/setFacultyData', {qs: queryString})
	},
} 
</script>
