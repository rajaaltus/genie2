<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="programmesData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:item.approval_status="{ item }">
        <v-chip :color="getColor(item.approval_status)" dark>
          {{ item.approval_status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1">
          <v-toolbar-title><span class="frm-title">Programmes / Events</span></v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-select
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            class="justify-end mt-6"
            @change="reloadData()"
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="#4da96b">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Programmes / Events</v-toolbar-title>
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
                <v-container>
                  <v-row>
                    <template>
                      <v-col cols="4">
                        <v-select
                          v-model="editedItem.type"
                          :rules="[v => !!v || 'Item is required']"
                          :items="programTypes"
                          label="Program Type*"
                        ></v-select>
                      </v-col>
                    </template>
                    <v-col cols="8">
                      <v-text-field v-model="editedItem.name"
                        :rules="[v => !!v || 'Item is required']"
                        label="Program Name*"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.location"
                        :rules="[v => !!v || 'Item is required']"
                        :items="locations"
                        label="Location*"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.forum"
                        :rules="[v => !!v || 'Item is required']"
                        :items="programLevels"
                        label="Forum*"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.colloborations"
                        :items="colloborations"
                        label="Colloborations"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.from_date"
                        label="Duration From"
                        required
                        placeholder="YYYY/MM/DD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.to_date"
                        label="Duration To"
                        required
                        placeholder="YYYY/MM/DD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="editedItem.participants_count"
                        :rules="[v => !!v || 'Item is required']"
                        type="number"
                        label="Participants Count*"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.coordinators"
                        label="Select Multiple Co-ordinators Press <TAB> key to end selection"
                      ></v-text-field>
                    </v-col> 
                    
                    <v-container fluid>
                      <v-textarea
                        v-model="editedItem.brief_report"
                        counter
                        label="Brief Report"
                        :value="value"
                      ></v-textarea>
                    </v-container>
                  </v-row>
                </v-container>
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
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
  props: ['reportYears', 'annualYear', 'programmesData'],
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
			{
				text: 'Updated at',
				align: 'left',
				value: 'updated_at',
			},
			{ text: 'Program Type', value: 'type' },
			{
				text: 'Name',
				align: 'left',
				sortable: false,
				value: 'name',
			},
			{ text: 'Location', value: 'location' },
			{ text: 'Duration From - To', value: 'from_date' },
			{ text: 'Duration To', value: 'to_date' },
			{ text: 'No of Participants', value: 'participants_count' },
			{ text: 'Approval Status', value: 'approval_status' },
			{ text: 'Actions', value: 'action', sortable: false },
    ],
    editedItem: {
			annual_year: 0,
      type: "",
      name: "",
      location: "",
      forum: "",
      colloborations: "",
      from_date: "",
      to_date: "",
      participants_count: 0,
      coordinators: "",
      brief_report: "",
      deleted: false,
      approval_status: "Pending",
      approved_by: "",
      department: 0,
      user: 0,
      rejected_reason: null
    },
    deletedItem: {
      annual_year: 0,
      type: "",
      name: "",
      location: "",
      forum: "",
      colloborations: "",
      from_date: "",
      to_date: "",
      participants_count: 0,
      coordinators: "",
      brief_report: "",
      deleted: false,
      approval_status: "Pending",
      approved_by: "",
      department: 0,
      user: 0,
      rejected_reason: null
    },
    editedIndex: -1,
    programTypes: [
			'Conference',
			'Workshop',
			'Seminar',
			'Symposium',
			'Scientific'
		],
		programLevels: [
			'International',
			'National',
			'Regional',
			'State',
			'Local'
		],
		locations: ['NIMHANS', 'OUTSIDE_NIMHANS'],
		colloborations: ['Departmental', 'Interdepartmental'],
		approvals: ['Pending', "Rejected", 'Approved'],
  }),
  computed: {
    ...mapState({
      programmesData: state => state.program.programmesData.result,
      staffs: state => state.staffs
    })
    
  },
  watch: {
		dialog (val) {
			val || this.close()
		},
  },
  async fetch ({store}) {
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

  methods: {
    getColor (approvalStatus) {
			if (approvalStatus === 'Rejected') return 'red'
			else if (approvalStatus === 'Pending') return 'orange'
			else return 'green'
    },
    editItem (item) {
      this.editedIndex = this.programmesData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialog = true
		},

		deleteItem (item) {
      this.deletedItem = Object.assign({}, item)
			// confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
			this.deletedItem.deleted = true
			var payload = this.deletedItem;
			console.log(payload);
      var vm = this;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.dispatch('program/updateProgram', payload)
				.then(resp => {
          this.loading = false;
					Swal.fire({
						title: 'Success',
						text: 'Deleted Successfully!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					})
					  this.reloadData();
          })
          Swal.fire({
              title: 'Something Wrong!',
              text: err,
              icon: 'warning',
              showConfirmButton: false,
							timer: 4500
          })
        }
      })
		},
    async reloadData () {
			this.loading = true;
			let deptId = this.$store.state.user.fullUser.department.id;
			let userId = this.$store.state.auth.user.id;
			let queryString = '';
			
			if (this.$store.state.auth.user.userType==='Faculty' || this.$store.state.auth.user.userType==='Student') {
			 queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${this.annualYear}`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			else {
				queryString = `department.id=${deptId}&annual_year=${this.annualYear}&deleted_ne=true`;
			 await this.$store.dispatch('program/setProgrammesData', {qs: queryString})
			}
			this.loading = false;
		},
		close () {
			this.dialog = false
			setTimeout(() => {
				this.programmesData = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			}, 300)
		},

		save () {
			if (this.editedIndex > -1) {
				if(this.$store.state.auth.user.role.id!=4)
					this.editedItem.approvalStatus = 'Pending'
				var payload = this.editedItem;
				console.log(payload);
				// var vm = this;
			 	this.$store.dispatch('program/updateProgram', payload)
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
						Swal.fire({
              title: 'Something Wrong!',
              text: err,
              icon: 'warning',
              showConfirmButton: false,
							timer: 4500
            })
					});
			} else {
				// this.program.push(this.editedItem)
				console.log(this.programmesData.push(this.editedItem))
			}
			this.close()
		}
  }
  
}
</script>