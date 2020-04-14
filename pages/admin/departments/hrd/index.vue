<template>
  <v-app>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
    />
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
         <v-list flat color="#41704e" style="border-radius:0;">
            <v-list-item-group color="#ffde00">
              <v-list-item to="/admin/departments/hrd/courses">
                <v-list-item-icon class="pl-2 mr-3">
                  <v-icon class="disp-icon">mdi-library</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="disp">Regular Courses</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/admin/departments/hrd/trainings">
                <v-list-item-icon class="pl-2 mr-3">
                  <v-icon class="disp-icon">mdi-led-on</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="disp">Trainings at NIMHANS</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <h2>Aside</h2>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import PageHeader from '@/components/PageHeader'
export default {
  head() {
    return {
      title: 'HRD'
    }
  }, 
  components: {
    PageHeader
  },
  data: () => ({
    reportYears: [
      {
        id: 2017,
        val: "2017-2018"
      },
      {
        id: 2018,
        val: "2018-2019"
      },
      {
        id: 2019,
        val: "2019-2020"
      },
      {
        id: 2020,
        val: "2020-2021"
      }
    ],
    selectedYear: 0,
  })
} 
</script>

<style scoped>
.disp
{
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon
{
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>

