<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-note-outline cust-icon"></span>
        Activities &amp; Resources
      </v-tab>
      <v-tab>
        <span class="mdi mdi-table cust-icon"></span>
        Records
      </v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <YearDialog v-if="$store.state.selectedYear == 0" />
            <PageHeader
              :title="$metaInfo.title"
              :reportYears="reportYears"
              :selectedYear="$store.state.selectedYear"
              class="ml-0 pb-0 pt-0"
            />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <StudentActivities />
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1"> </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader'
import StudentActivities from '@/components/StudentActivities'
export default {
  head() {
    return {
      title: 'Participation'
    }
  }, 
  components: {
    PageHeader,
    StudentActivities
  }
} 
</script>

<style scoped>
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
