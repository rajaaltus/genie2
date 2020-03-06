<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<v-row justify="center">
				<v-cols cols="8"
					md="6"
					sm="4"
					lg="6"
				>
					<v-dialog v-model="dialog" persistent max-width="30%">
						<v-card>
							<v-card-title>
								<span class="headline">Select Reporting Year</span>
							</v-card-title>
							<v-card-text>
								<v-container>
									<v-row>
										<v-cols cols="12">
											<v-select
												v-model="selectedYear"
												:items="reportYears"
												item-text="val"
												item-value="id"
												label="Reporting Year"
												required
												class="text-center"
											></v-select>
										</v-cols>
									</v-row>
								</v-container>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue" text @click="dialog = false">
									Close
								</v-btn>
								<v-btn color="blue" text @click="setReportingYear">
									Set
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-cols>
			</v-row>
			<!-- Page title and Year Selection block -->
			<div class="uk-text-left uk-grid" data-uk-grid>
				<div class="uk-width-auto">
					<div class="page-title">
						<h1 class="uk-margin-left">
							Activities and Resources
						</h1>
					</div>
				</div>
			</div>
			<!-- Page title and Year Selection block ends here-->
			<div class="uk-text-center" uk-grid>
				<!-- left Navigation menu starts -->
				<div class="uk-width-1-4@s uk-width-1-1">
					<div class="uk-card uk-card-primary">
						<ul class="uk-nav-default uk-nav-parent-icon uk-text-left uk-text-bold uk-padding-small" uk-nav>
							<li v-for="(activity, index) in activities" :key="index" class="uk-padding-small-bottom">
								<nuxt-link :to="activity.path" class="uk-text-normal">
									<span class="uk-margin-small-right" :uk-icon="activity.icon"></span> {{ activity.title }}
								</nuxt-link>
							</li>
						</ul>
					</div>
				</div>
				<!-- left Navigation menu starts -->

				<!-- Page Forms starts here  -->
				<div class="uk-width-3-4@s uk-width-1-1">
					<div class="uk-card uk-card-default uk-card-body uk-text-left">
						<v-row no-gutters>
						</v-row>
						<div class="uk-child-width-1-3@xl uk-child-width-1-2@s uk-grid" data-uk-grid>
							<div v-for="(activity, index) in activities" :key="index">
								<ScCard>
									<nuxt-link :to="activity.path" class="sc-padding sc-padding-medium-ends uk-flex uk-flex-middle">
										<div class="uk-flex-1">
											{{ activity.title }}
											<p class="sc-color-secondary uk-margin-remove uk-text-medium">
												Total Activities: {{ getActivityCount(activity.id) }}
											</p>
										</div>
										<div class="md-bg-amber-600 uk-flex uk-flex-middle sc-padding-medium sc-padding-small-ends sc-round">
											<i :uk-icon="activity.icon" class="uk-text-secondary"></i>
										</div>
									</nuxt-link>
								</ScCard>
							</div>
						</div>
						<v-snackbar
							v-model="snackbar"
							:timeout="timeout"
						>
							{{ submitMessage }}
							<v-btn
								color="blue"
								text
								@click="snackbar = false"
							>
								Close
							</v-btn>
						</v-snackbar>
					</div>
				</div>
				<!-- Page forms ends here -->
			</div>

			<!-- Data Table starts here --->
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
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
		dialog: false,
		snackbar: false,
		timeout: 2000,
		submitMessage: 'Added sucessfully!'
	}),
	computed: {
		...mapGetters(['activities']),
		...mapState ({
			selectedYear: state => state.selectedYear,
			staffs: state => state.staffs
		})
	},
	
	async fetch ({store}) {
		await store.dispatch('setActivties');
		if (!store.state.user.userProfile.success) {
			let id = store.state.auth.user.id
			
			await store.dispatch('user/setUserProfile', {id: id})
				.catch(err => {
					this.snackbar = true
					this.submitMessage = err
				});
		}
		let id = store.state.auth.user.id;
		let deptId = store.state.user.userProfile.result.departmentId;
		let queryString = ''
		if (store.state.auth.user.authorities[0]==='ROLE_DEPARTMENT')
			queryString = `departmentId.equals=${deptId}&status.notEquals=DELETED`;
		else
			queryString = `departmentId.equals=${deptId}&userProfileId.equals=${id}`;
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
		await store.dispatch('theses/setThesesData', {qs: queryString})
		queryString = `departmentId.equals=${deptId}&status.equals=VALID`;
		await store.dispatch('setStaffs', {qs: queryString})
	},
	mounted () {
		if (this.$store.state.selectedYear === 0)
			this.dialog = true;
		else
			this.selectedYear = this.$store.state.selectedYear
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

		},
		async setReportingYear () {
			this.dialog = false;
			await this.$store.dispatch('setReportingYear', this.selectedYear)
		}
	}
}
</script>