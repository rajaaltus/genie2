<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <FacultyActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <v-card class="mx-auto">
					<v-row align="center" justify="start" no-gutters>
					<v-col cols="12" md="4" lg="4" v-for="(activity, index) in $store.state.activities" :key="index">
					<v-card
						class="ma-4"
						outlined
					>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">{{activity.title}} <v-icon v-text="activity.icon" class="float-right"></v-icon></v-list-item-title>
								<v-list-item-subtitle>Total Activities: {{ getActivityCount(activity.id) }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<div>
							
						</div>
						<v-card-actions>
							<v-btn color="success" link :to="activity.path">View</v-btn>
						</v-card-actions>
					</v-card>
					</v-col>
					</v-row>
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
      title: 'Faculty Dashboard'
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

    let id = store.state.auth.user.id;
		let queryString = ''
		if (store.state.auth.user.userType==='DEPARTMENT')
			queryString = `deleted_ne=true`;
		else
			queryString = `user.id=${id}`;
		await store.dispatch('program/setProgrammesData', {qs: queryString})
		await store.dispatch('visitor/setVisitorsData', {qs: queryString})
		await store.dispatch('training/setTrainingsData', {qs: queryString})
		await store.dispatch('presentation/setPresentationsData', {qs: queryString})
		await store.dispatch('participation/setParticipationsData', {qs: queryString})
		await store.dispatch('public/setPublicData', {qs: queryString})
		await store.dispatch('research/setResearchData', {qs: queryString})
		await store.dispatch('publication/setPublicationsData', {qs: queryString})
		await store.dispatch('recognition/setRecognitionsData', {qs: queryString})
		await store.dispatch('patent/setPatentsData', {qs: queryString})
		await store.dispatch('assignment/setAssignmentsData', {qs: queryString})
		// await store.dispatch('theses/setThesesData', {qs: queryString})
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