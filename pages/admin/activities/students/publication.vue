<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <StudentActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <v-card class="mx-auto">
					
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import PageHeader from '@/components/PageHeader'
import StudentActivities from '@/components/StudentActivities'
export default {
  head() {
    return {
      title: 'Publications'
    }
  }, 
  components: {
    PageHeader,
    StudentActivities
  }
} 
</script>