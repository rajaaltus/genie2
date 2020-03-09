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
    <hr class="my-6">
    <v-row>
      <v-col cols="12" md="12">
        <ProgramTable :reportYears="reportYears" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import FacultyActivities from '@/components/FacultyActivities'
import YearDialog from '@/components/YearDialog'
import ProgramForm from '@/components/forms/ProgramForm'
import ProgramTable from '@/components/tables/ProgramTable'
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
    ProgramForm,
    ProgramTable
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
   
    //Filter Query Fetch
	
    let userId = store.state.auth.user.id
    let deptId = store.state.user.fullUser.department.id;
		let queryString = '';
		console.log('Userid:'+userId+',deptId:'+deptId+',QS:'+queryString );
		if (store.state.auth.user.userType==='Faculty' || store.state.auth.user.userType==='Student') {
			 queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true`;
			// console.log(queryString);
			await store.dispatch('program/setProgrammesData', {qs: queryString})
		}
		else {
			queryString = `department.id=${deptId}&deleted_ne=true`;
			await store.dispatch('program/setProgrammesData', {qs: queryString})
    }
  },
  mounted () {
   
  },
  methods: {
    async changeReportingYear () {
			await this.$store.dispatch('setReportingYear', this.selectedYear)
    },
    async reloadData () {
			this.loading = true;
			let deptId = this.$store.state.user.userProfile.result.departmentId;
			let userId = this.$store.state.user.userProfile.result.userId;
			let queryString = '';
			
			if (this.$store.state.auth.user.authorities[0]==='ROLE_FACULTY' || this.$store.state.auth.user.authorities[0]==='ROLE_STUDENT') {
			 queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${this.store.state.selectedYear}`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			else {
				queryString = `department.id=${deptId}&nnual_year=${this.store.state.selectedYear}&deleted_ne=true`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			this.loading = false;
		},
  }
  
} 
</script>