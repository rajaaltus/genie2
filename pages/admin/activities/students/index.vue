<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <StudentActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        
					<v-row align="center" justify="start" no-gutters>
					<v-col cols="12" md="4" lg="4" v-for="(activity, index) in $store.state.studentActivities" :key="index">
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
					<!--<v-btn color="success" class="float-right" small link :to="activity.path">View</v-btn>-->
					
					</v-alert>
					</v-col>
					</v-row>
        
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import PageHeader from '@/components/PageHeader'
import StudentActivities from '@/components/StudentActivities'
export default {
  head() {
    return {
      title: 'Activities & Resources of Students'
    }
  }, 
  components: {
    PageHeader,
    StudentActivities
  },
  data: () => ({
    
  }),
  async fetch ({store}) {
    await store.dispatch('setStudentActivities');

    let id = store.state.auth.user.id;
		let queryString = ''
		if (store.state.auth.user.userType==='DEPARTMENT')
			queryString = `deleted_ne=true`;
		else
			queryString = `user.id=${id}`;
    
    
		await store.dispatch('presentation/setPresentationsData', {qs: queryString})
		await store.dispatch('participation/setParticipationsData', {qs: queryString})
		await store.dispatch('publication/setPublicationsData', {qs: queryString})
		await store.dispatch('recognition/setRecognitionsData', {qs: queryString})
		await store.dispatch('theses/setThesesData', {qs: queryString})
  },
  methods: {
		 getActivityCount (id) {
			if (id==1) {
				return this.$store.state.program.programmesData.result.length
			}
			if (id==2) {
				return this.$store.state.visitor.visitorsData.result.length
			}
			if (id==3) {
				return this.$store.state.training.trainingsData.result.length
			}
			if (id==4) {
				return this.$store.state.presentation.presentationsData.result.length
			}
			if (id==5) {
				return this.$store.state.participation.participationsData.result.length
			}
			if (id==6) {
				return this.$store.state.public.publicData.result.length
			}
			if (id==7) {
				return this.$store.state.research.researchData.result.length
			}
			if (id==8) {
				return this.$store.state.publication.publicationsData.result.length
			}
			if (id==9) {
				return this.$store.state.recognition.recognitionsData.result.length
			}
			if (id==10) {
				return this.$store.state.patent.patentsData.result.length
			}
			if (id==11) {
				return this.$store.state.assignment.assignmentsData.result.length
			}
			if (id==12) {
				return this.$store.state.theses.thesesData.result.length
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