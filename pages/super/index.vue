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
        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Biophysics</span
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

        <v-col cols="3" lg="2">
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Child & Adolescent Psychiatry</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Clinical Neurosciences</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Clinical Psychology</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Epidemiology</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="light-green" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Human Genetics</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Mental Health Education</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Neuroanaesthesia and Neurocritical Care</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Neurochemistry</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >NIIR</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1" color="red" dark>
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Neurological Rehabilitation</span
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

        <v-col cols="3" lg="2">
          <v-card tile elevation="1">
            <v-card-title>
              <span
                class="subtitle-1 font-weight-normal d-inline-block text-truncate"
                >Neurological Rehabilitation</span
              >
            </v-card-title>
            <v-card-text>
              <v-layout align-start justify-start>
                <v-btn fab x-small color="white" class="mr-1" disabled
                  ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                >

                <v-btn fab x-small color="white" disabled
                  ><v-icon color="blue">mdi-file-word</v-icon></v-btn
                >
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "super",
};
</script>
