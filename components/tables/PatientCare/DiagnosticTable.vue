<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="diagnosticData"
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
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1">
          <v-toolbar-title
            ><span class="frm-title">Diagnostic Services</span></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            v-model="selectedYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            class="justify-end mt-6"
            @change="reloadData()"
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="#4da96b">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Diagnostic Services | Update Details</v-toolbar-title
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
                        <v-select
                          v-model="editedItem.lab_type"
                          label="Lab Service Type *"
                          :rules="[v => !!v || 'Select the Lab Service Type']"
                          :items="serviceType"
                          :value="editedItem.lab_type"
                          @change="getTests(editedItem.lab_type)"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-combobox
                          v-model="editedItem.pc_diagnostic_test"
                          :rules="[v => !!v || 'Enter the Test Name']"
                          label="Test Name *"
                          required
                          :items="$store.state.diagnostic.testData"
                          item-text="test_name"
                          item-value="id"
                          @blur="editTest"
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>
                                  No results matching "<strong>{{
                                    search
                                  }}</strong
                                  >". Press <kbd>tab</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="editedItem.samples_analyzed"
                          type="number"
                          :rules="[
                            v =>
                              !!v || 'Enter the Total No. of Samples Analysed'
                          ]"
                          label="Samples Analyzed *"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <span style="color:red; font-size:12px;"
                      >* Mandatory fields</span
                    >
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon right @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon right @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Swal from 'sweetalert2'
export default {
  props: ['reportYears', 'annualYear', 'diagnosticData'],
  data: () => ({
    loading: false,
    valid: true,
    editedItem: 
		{
			annual_year: 0,
			lab_type: "",
			samples_analyzed: 0,
			deleted: false,
			department: 0,
			pc_diagnostic_test: 0
    },
		deletedItem: {
			annual_year: 0,
			lab_type: "",
			samples_analyzed: 0,
			deleted: false,
			department: 0,
			pc_diagnostic_test: 0
    },
    dialog: false,
    search: null,
    headers: [
			{
				text: 'Last Updated',
				align: 'left',
				value: 'updated_at'
			},
			{ text: 'Lab Service Type', value: 'lab_type' },
			{ text: 'Test Name', value: 'pc_diagnostic_test.test_name' },
			{ text: 'Samples Analyzed', value: 'samples_analyzed'},
			{ text: 'Actions', value: 'action', sortable: false },
		],
  }),
  computed: {
		...mapState({
			diagnosticData: state => state.diagnostic.diagnosticData
		}),
	},
	watch: {
		dialog (val) {
			val || this.close()
		},
		search (val) {
			if (this.procedures.length > 0) return
			this.getTests();
		},
	},

	async fetch ({store}) {
		let queryString = ''
		queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true`;
		await store.dispatch('diagnostic/setDiagnosticData', {qs: queryString});
  },
  async mounted () {
    this.selectedYear = this.$store.state.selectedYear;
    this.reloadData();
  },
  methods: {
    async addTest () {
			if(typeof this.diagnostic.test_name != 'object' && this.diagnostic.test_name!=null) {
				this.newTest = Object.assign({}, {
					lab_type: this.diagnostic.lab_type,
					test_name: this.diagnostic.test_name,
					deleted: false,
					department: this.$store.state.auth.user.department
				})
				var payload = this.newTest;
				await this.$store.dispatch('diagnostic/addTest', payload)
					.then(resp => {
						Swal.fire('New Test Name is Added!<br>Please go back and select it from list.')
						this.reset();
					})
			} 
		},
		async editTest () {
			if(typeof this.editedItem.pc_diagnostic_test === 'string' && this.editedItem.pc_diagnostic_test!=null) {
				this.newTest = Object.assign({}, {
					lab_type: this.editedItem.lab_type,
					test_name: this.editedItem.pc_diagnostic_test,
					deleted: false,
					department: this.$store.state.auth.user.department
				})
				var payload = this.newTest;
				
				await this.$store.dispatch('diagnostic/addTest', payload)
					.then(resp => {
						Swal.fire('New Test Name Added!')
						this.$refs.editedForm.reset();
					})
			} 
		},
		async getTests (lab_type) {
			let queryString = '';
			// this.diagnostic.test_name = '';
			// this.reset();
			this.diagnostic.lab_type = lab_type;
			queryString = `department.id=${this.$store.state.auth.user.department}&lab_type=${lab_type}`;
			await this.$store.dispatch('diagnostic/setTest', {qs: queryString})
    },
    async reloadData () {
      this.loading = true;
			let queryString = ''
			queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.selectedYear}`;
      await this.$store.dispatch('diagnostic/setDiagnosticData', {qs: queryString});
      this.loading = false;
    },
    editItem (item) {
			this.editedIndex = this.diagnosticData.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			 const index = this.diagnosticData.indexOf(item)
			 this.deletedItem = Object.assign({}, item)
			// confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
			this.deletedItem.deleted = true;
			var payload = this.deletedItem;
			//console.log(payload);
			confirm('Are you sure you want to delete this item?') && 	this.$store.dispatch('diagnostic/updateDiagnostic', payload)
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
				this.diagnosticData = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			}, 300)
		},

		save () {
			if(this.$refs.editedForm.validate()) {
				if (this.editedIndex > -1) {
				// Object.assign(this.program[this.editedIndex], this.editedItem)
					var payload = this.editedItem;
					// console.log(payload);
					var vm = this;
			 	this.$store.dispatch('diagnostic/updateDiagnostic', payload)
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
				} else {
				// this.program.push(this.editedItem)
					// console.log(this.diagnosticData.push(this.editedItem))
				}
				this.close()
			}
		}
  }
}
</script>
