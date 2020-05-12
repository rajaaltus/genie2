<template>
  <div>
    <v-container fluid>
      <v-row class="pr-4">
        <v-col cols="12" lg="3">
          <v-select
            v-model="selectedYear"
            outlined
            dense
            ref="year"
            :items="reportYears"
            item-value="id"
            item-text="val"
            label="Reporting Year"
            placeholder="Pick Year"
            color="success"
            class="disp"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col cols="3" lg="2" v-for="department in departments" :key="department.id">
          <v-card tile elevation="1" :color="cardColor" :dark="dark">
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >{{ department.name }}</span
              >
            </v-card-title>
            <v-card-text v-if="available==='default'">
              <v-layout align-start justify-start>
                <v-btn fab x-small color="white" class="mr-1" disabled
                  ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                >

                <v-btn fab x-small color="white" disabled
                  ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                >
              </v-layout>
            </v-card-text>
            <v-card-text v-if="available==='available'">
              <v-layout align-start justify-start>
                <v-tooltip right color="green">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on" class="mr-1"
                      ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                    >
                  </template>
                  <span>Download Faculty Report</span>
                </v-tooltip>
                <v-tooltip right color="green">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on"
                      ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                    >
                  </template>
                  <span>Download Student Report</span>
                </v-tooltip>
              </v-layout>
            </v-card-text>
            <v-card-text v-if="available==='notSubmitted'">
              <v-layout align-start justify-start>
                <v-tooltip right color="red">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on"
                      ><v-icon color="blue">mdi-send</v-icon></v-btn
                    >
                  </template>
                  <span>Send Reminder</span>
                </v-tooltip>
              </v-layout>
            </v-card-text>
          </v-card>
           
        </v-col>
       
        <!-- <template v-if="available==='available'" class="align-left">
          <v-col cols="3" lg="2" v-for="department in departments" :key="department.id"> 
            
          <v-card tile elevation="1" color="light-green" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >{{department.name}}</span
              >
            </v-card-title>
            <v-card-text>
              <v-layout align-start justify-start>
                <v-tooltip right color="light-green">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on" class="mr-1"
                      ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                    >
                  </template>
                  <span>Download Faculty Report</span>
                </v-tooltip>

                <v-tooltip right color="light-green">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on"
                      ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                    >
                  </template>
                  <span>Download Student Report</span>
                </v-tooltip>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
         </template>

         <template v-if="available==='notSubmitted'">
           <v-col cols="3" lg="2" v-for="department in departments" :key="department.id"> 
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Biostatistics</span
              >
            </v-card-title>
            <v-card-text>
              <v-layout align-start justify-start>
                <v-tooltip right color="red">
                  <template v-slot:activator="{ on }">
                    <v-btn fab x-small color="white" v-on="on"
                      ><v-icon color="blue">mdi-send</v-icon></v-btn
                    >
                  </template>
                  <span>Send Reminder</span>
                </v-tooltip>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
         </template> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: "super",
  data() {
    return {
      selectedYear: null,
      cardColor: 'red',
      dark: true,
      available: 'notSubmitted'
    }
  },
  computed: {
    ...mapState({
      departments: state => state.user.departments.result
    }),
    reportYears() {
      return this.$store.state.reportYears;
    }
  },
  async fetch({store}) {
    await store.dispatch("user/getAllDepartment")
  }
};
</script>
