<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" :reportYears="reportYears" :selectedYear="$store.state.selectedYear" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <FacultyActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <v-card class="mx-auto">
					
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import PageHeader from '@/components/PageHeader'
import FacultyActivities from '@/components/FacultyActivities'
export default {
  head() {
    return {
      title: 'Training Underwent'
    }
  }, 
  components: {
    PageHeader,
    FacultyActivities
  },
  data: () => ({
    reportYears: [
			{
				id: 2017,
				val: '2017-2018',
			},
			{
				id: 2018,
				val: '2018-2019'
			},
			{
				id: 2019,
				val: '2019-2020'
			},
			{
				id: 2020,
				val: '2020-2021'
			}
    ],
    selectedYear: 0,
  }),
  async fetch({store}) {
    await store.dispatch('setActivities');
  },
  methods: {
    async changeReportingYear () {
			await this.$store.dispatch('setReportingYear', this.selectedYear)
		}
  }
} 
</script>