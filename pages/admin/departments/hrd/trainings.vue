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
         <v-list color="#f2f2f2">
            <v-list-item-group color="success">
              <v-list-item to="/admin/departments/hrd/courses">
                <v-list-item-icon>
                  <v-icon>mdi-atom</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Courses</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/admin/departments/hrd/trainings">
                <v-list-item-icon>
                  <v-icon>mdi-atom</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Trainings</v-list-item-title>
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
      title: 'HRD - Trainings'
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
