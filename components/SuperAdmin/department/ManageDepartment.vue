<template>
 <div>
  <v-data-table
    :headers="headers"
    :items="departments"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Departments</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark small class="mb-2" v-on="on">New Department</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="Department name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Department Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        status: true,
      },
      defaultItem: {
        name: '',
        status: true,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
      },
      ...mapState({
        departments: state => state.department.departments
      })
      // departments() {
      //   return this.$store.state.department.departments;
      // }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.$store.dispatch('department/getDepartments')
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.departments.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.departments.indexOf(item)
        // confirm('Are you sure you want to delete this item?') && this.departments.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          // Object.assign(this.departments[this.editedIndex], this.editedItem)
          console.log(this.editedItem);
        } else {
          var payload = Object.assign({},this.editedItem);
          console.log(payload);
          // this.$store.dispatch('department/addDepartment', payload);
          // this.departments.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>