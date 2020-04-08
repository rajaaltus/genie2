<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" class="ml-0" />  
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <FacultyActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
			<v-row align="center" justify="start" no-gutters>
			<v-col cols="12" md="4" lg="4" v-for="(activity, index) in $store.state.activities" :key="index">
			<v-alert class="mr-2"
				border="left"
				colored-border
				color="yellow accent-4"
				elevation="2"
				tile
			>
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="mb-0"><v-icon v-text="activity.icon"></v-icon> {{activity.title}} </v-list-item-title>
						<v-list-item-subtitle><h1 class="count-disp">{{ getActivityCount(activity.id) }}</h1></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-alert>
			</v-col>
			</v-row>
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
      title: 'Activities & Resources of Faculty / Staff'
    }
  }, 
  components: {
    PageHeader,
    FacultyActivities
  },
  data: () => ({
    
  }),
  async fetch ({store}) {
		await store.dispatch('setActivities');
		
		if(store.state.user.fullUser){
      let userId = store.state.auth.user.id;
      await store.dispatch('user/setFullUser', {id: userId})
		}
		
		let id = store.state.auth.user.id;
		let deptId = store.state.auth.user.department;
		let queryString = ''
		if (store.state.auth.user.userType==='DEPARTMENT')
			queryString = `department.id=${deptId}&deleted_ne=true`;
		else
			queryString = `department.id=${deptId}&user.id=${id}&deleted_ne=true`;
				await store.dispatch('program/countProgrammes', {qs: queryString})
				await store.dispatch('visitor/countVisitors', {qs: queryString})
				await store.dispatch('training/countTrainings', {qs: queryString})
				await store.dispatch('presentation/countPresentations', {qs: queryString})
				await store.dispatch('participation/countParticipations', {qs: queryString})
				await store.dispatch('public/countPublicEngagements', {qs: queryString})
				await store.dispatch('research/countResearch', {qs: queryString})
				await store.dispatch('publication/countPublications', {qs: queryString})
				await store.dispatch('recognition/countRecognitions', {qs: queryString})
				await store.dispatch('patent/countPatents', {qs: queryString})
				await store.dispatch('assignment/countAssignments', {qs: queryString})
		let qs = ''
		qs = `department.id=${deptId}&blocked_ne=true`
		await store.dispatch('setStaffs', {qs: qs})
  },
  methods: {
		 getActivityCount (id) {
			if (id==1) {
				return this.$store.state.program.programmesCount
			}
			if (id==2) {
				return this.$store.state.visitor.visitorsCount
			}
			if (id==3) {
				return this.$store.state.training.trainingsCount
			}
			if (id==4) {
				return this.$store.state.presentation.presentationsCount
			}
			if (id==5) {
				return this.$store.state.participation.participationsCount
			}
			if (id==6) {
				return this.$store.state.public.publicCount
			}
			if (id==7) {
				return this.$store.state.research.researchCount
			}
			if (id==8) {
				return this.$store.state.publication.publicationsCount
			}
			if (id==9) {
				return this.$store.state.recognition.recognitionsCount
			}
			if (id==10) {
				return this.$store.state.patent.patentsCount
			}
			if (id==11) {
				return this.$store.state.assignment.assignmentsCount
			}
			if (id==12) {
				return this.$store.state.theses.thesesCount
			}
    }
  }
} 
</script>
<style scoped>

.count-disp
{
	text-align: right;
	padding-right: 30px;
	font-size: 30px;
}
</style>