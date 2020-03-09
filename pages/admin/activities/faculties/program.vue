<template>
  <v-app>
    <YearDialog v-if="$store.state.selectedYear==0" />
    <PageHeader :title="$metaInfo.title" :reportYears="reportYears" :selectedYear="$store.state.selectedYear" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <FacultyActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <ProgramForm />
      </v-col>
    </v-row>
    
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import FacultyActivities from '@/components/FacultyActivities'
import YearDialog from '@/components/YearDialog'
import ProgramForm from '@/components/forms/ProgramForm'
export default {
  head() {
    return {
      title: 'Programmes & Events'
    }
  }, 
  components: {
    PageHeader,
    FacultyActivities,
    YearDialog,
    ProgramForm
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
    ]
  }),
  async fetch({store}) {
    await store.dispatch('setActivities');
    if(store.state.user.fullUser){
      let userId = store.state.auth.user.id;
      await store.dispatch('user/setFullUser', {id: userId})
    }
  },
  mounted () {
   
  },
  methods: {
    async changeReportingYear () {
			await this.$store.dispatch('setReportingYear', this.selectedYear)
		}
  }
  
} 
</script>