<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <FacultyActivities />
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
import FacultyActivities from '@/components/FacultyActivities'
export default {
  head() {
    return {
      title: 'Visitor'
    }
  }, 
  components: {
    PageHeader,
    FacultyActivities
  }
} 
</script>