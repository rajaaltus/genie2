<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="visitorsData"
      sort-by="id"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.approvalStatus="{ item }">
        <v-chip :color="getColor(item.approvalStatus)" dark>
          {{ item.approvalStatus }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify">
          <v-toolbar-title><span class="frm-title">Visitors to the Department</span></v-toolbar-title>
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
            class="justify-end mt-8"
            @change="reloadData()"
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="#4da96b">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Visitor to the Department | Update Details</v-toolbar-title>
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
              <v-card-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field v-model="editedItem.name"
                        label="Visitor Name"
                        :rules="[v => !!v || 'Item is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="editedItem.designation"
                        label="Designation"
                        :rules="[v => !!v || 'Item is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="editedItem.institutionAffiliation"
                        label="Institute Affiliation"
                        :rules="[v => !!v || 'Item is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.lectureTitle"
                        label="Lecture Title"
                        :rules="[v => !!v || 'Item is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.fromDate"
                        label="Duration From"
                        required
                        placeholder="YYYY/MM/DD"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.toDate"
                        label="Duration To"
                        required
                        placeholder="YYYY/MM/DD"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-container fluid>
                      <v-textarea
                        v-model="editedItem.briefReport"
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
export default {
  props: ['reportYears'],
  data: () => ({
    loading: false,
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
    dialog: false,
		//Data table header
		headers: [
			{
				text: 'Id',
				align: 'left',
				value: 'id',
			},
			{
				text: 'Name',
				align: 'left',
				value: 'name',
			},
			{ text: 'Designation', value: 'designation' },
			{ text: 'institutionAffiliation', value: 'institutional_affiliation' },
			{ text: 'From', value: 'from_date' },
			{ text: 'To', value: 'to_date' },
			{ text: 'Title', value: 'title' },
			{ text: 'Approval Status', value: 'approval_status' },
			{ text: 'Actions', value: 'action', sortable: false },
    ],
    editedItem: {
			annual_year: 0,
			approval_status: "PENDING",
			approved_by: "",
			approved_date: "",
			brief_report: "",
			department: 0,
			designation: "",
			from_date: new Date().toISOString().substr(0, 10),
			institutional_affiliation: "",
			title: "",
			name: "",
			rejected_reason: "",
			deleted: false,
			to_date: new Date().toISOString().substr(0, 10),
			user: 0
    },
  }),
  computed: {
		...mapState({
			visitorsData: state => state.visitor.visitorsData.result,
			staffs: state => state.staffs
    })
  },
  async fetch({store}) {

  },
  methods: {
    getColor (approvalStatus) {
			if (approvalStatus === 'REJECTED') return 'red'
			else if (approvalStatus === 'PENDING') return 'orange'
			else return 'green'
		},
  }

}
</script>