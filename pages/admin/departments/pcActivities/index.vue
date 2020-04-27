<template>
  <v-app>
    <YearDialog v-if="$store.state.selectedYear==0"/>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
    />
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <PatientCare />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <h2>Loading...</h2>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PatientCare from '@/components/PatienCare'
import YearDialog from '@/components/YearDialog'
export default {
  head() {
    return {
      title: 'Patient Care Activities'
    }
  }, 
  components: {
    PageHeader,
    YearDialog,
    PatientCare
  },
  data: () => ({
    selectedYear: 0,
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    }
  },
  mounted() {
    this.$router.push('/admin/departments/pcActivities/clinical')
  },
  methods: {
    
  }
} 
</script>
