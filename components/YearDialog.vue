<template>
  <div>
    <v-dialog v-model="Ydialog" persistent max-width="500"> 
			<v-card>
				<v-card-title>
					<span class="text-center">Reporting Year Selection</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-spacer></v-spacer>
							<v-col cols="12">
								<v-select
									v-model="selectedYear"
									:items="reportYears"
									item-text="val"
									item-value="id"
									label="Select Reporting Year"
									required
									outlined
									class="text-center"
								></v-select>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue" text @click="Ydialog = false">
						Close
					</v-btn>
					<v-btn color="blue" text @click="setReportingYear">
						Set
					</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    Ydialog: false,
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
  watch: {
		dialog (val) {
			val || this.close()

		},
	},
	mounted () {
		if(this.$store.state.selectedYear == 0)
			this.Ydialog = true;
	},
  methods: {
    async setReportingYear () {
			this.Ydialog = false;
			await this.$store.dispatch('setReportingYear', this.selectedYear)
			this.$emit('set-year')
			console.log('emitting....')
		},
  }
}
</script>