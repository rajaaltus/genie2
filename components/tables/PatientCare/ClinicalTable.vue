<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="clinicalData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:top>
        <v-toolbar color="#f2f2f2" flat class="d-flex justify pt-1" style="border-radius:0;">
          <v-toolbar-title><span class="frm-title">Clinical Services</span></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            color="green"
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            class="justify-end mt-6"
            @change="reloadData()"
          ></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn
                x-small
                fab
                color="green"
                dark
                @click="reloadData"
                v-on="on"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span>
          </v-tooltip>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card flat>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Clinical Services</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn dark text @click="save">
                    Save
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="editedForm"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent
                >
                  <v-container>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          color="green"
                          v-model="editedItem.screenings"
                          label="Screenings"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.registrations"
                          label="Registrations"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.followups"
                          label="Follow-ups"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.admissions"
                          label="Admissions"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.discharges"
                          label="Discharges"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.deaths"
                          label="Deaths"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.emergencies"
                          label="Emergencies"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.internal_ref"
                          label="Referrals - Internal"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.external_ref"
                          label="Referrals - External"
                          type="number"
                          :rules="[
                            v => !!v || 'Enter Total No. of Patients / Cases'
                          ]"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon centre @click="editItem(item)" color="green">mdi-pencil-box</v-icon>
        <v-icon centre @click="deleteItem(item)" color="error">mdi-delete-circle</v-icon>
      </template>
      
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2'
export default {
  props: ['reportYears'],
  data: () => ({
    valid: true,
    loading: false,
    annualYear: 0,
    editedItem: 
		{
			annual_year: 0,
			screenings: 0,
			registrations: 0,
			followups: 0,
			admissions: 0,
			discharges: 0,
			deaths: 0,
			emergencies: 0,
			external_ref: 0,
			internal_ref: 0,
			deleted: false,
			department: 0
		},
		deletedItem: 
		{
			annual_year: 0,
			screenings: 0,
			registrations: 0,
			followups: 0,
			admissions: 0,
			discharges: 0,
			deaths: 0,
			emergencies: 0,
			external_ref: 0,
			internal_ref: 0,
			deleted: false,
			department: 0
		},
		headers: [
      {
          text: 'Last Updated',
          align: 'left',
          value: 'updated_at'
      },
      { text: 'Screenings', value: 'screenings' },
      { text: 'Registration', value: 'registrations'},
      { text: 'Follow-ups', value: 'followups' },
      { text: 'Admissions', value: 'admissions'},
      { text: 'Discharges', value: 'discharges'},
      { text: 'Deaths', value: 'deaths'},
      { text: 'Emergencies', value: 'emergencies'},
      { text: 'Internal Ref', value: 'internal_ref'},
      { text: 'External Ref', value: 'external_ref'},
      { text: 'Actions', value: 'action', sortable: false},
    ],
    dialog: false,
  }),
  mounted () {
    this.annualYear = this.$store.state.selectedYear;
  },
  computed: {
    ...mapState({
      clinicalData: state =>  state.clinical.clinicalData.result
    })
  },
  watch: {
		dialog (val) {
			val || this.close()
    },
  },
  methods: {
    async reloadData () {
			this.loading = true;
			let queryString = ''
			queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
			await this.$store.dispatch('clinical/setClinicalData', {qs: queryString})
			this.loading = false;
		},
		editItem (item) {
			this.editedIndex = this.clinicalData.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
    },
    deleteItem (item) {
			 this.deletedItem = Object.assign({}, item)
			this.deletedItem.deleted = true;
			var payload = this.deletedItem;
			// console.log(payload);
			confirm('Are you sure you want to delete this item?') && 	this.$store.dispatch('clinical/updateClinical', payload)
				.then(resp => {
					Swal.fire({
						title: 'Success',
						text: 'Deleted Successfully!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					})
					this.reloadData();
				})
				.catch(err => {
					this.snackbar = true
					this.submitMessage = err
				});
		},

		close () {
			this.dialog = false
			setTimeout(() => {
				this.publicData = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			}, 300)
		},

		save () {
			if (this.$refs.editedForm.validate()) {
				if (this.editedIndex > -1) {
				// Object.assign(this.program[this.editedIndex], this.editedItem)
					var payload = this.editedItem;
					 console.log(payload);
			 	this.$store.dispatch('clinical/updateClinical', payload)
						.then(resp => {
							Swal.fire({
								title: 'Success',
								text: 'Updated Successfully!',
								icon: 'success',
								showConfirmButton: false,
								timer: 1500
							})
							this.reloadData();
						})
						.catch(err => {
							this.snackbar = true
							this.submitMessage = err
						});
				} else {
				// this.program.push(this.editedItem)
					// console.log(this.clinicalData.push(this.editedItem))
				}
				this.close()
			}
		}
  }
}
</script>

<style scoped>
.frm-title
{
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>
