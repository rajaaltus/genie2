<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
      <v-row no-gutters>
        <v-col cols="12" md="12" lg="4">
          <div id="vuechart-example">
            <client-only>
            <apexchart width="80%" type="bar" :options="options" :series="series"></apexchart>
            </client-only>
          </div>
        </v-col>
        <v-col cols="12" lg="4" md="12">
          <div>
            <apexchart width="80%" type="line" :options="options" :series="series"></apexchart>
          </div>
        </v-col>
        <v-col cols="12" lg="4" md="12">
          <div>
            <apexchart width="380" type="donut" :options="options" :series="donutSeries"></apexchart>
          </div>
        </v-col>
      </v-row>
  </v-app>
</template>

<script>

import PageHeader from '@/components/PageHeader'
export default {
  head() {
    return {
      title: 'Reports'
    }
  }, 
  components: {
    PageHeader
  },
  data: () => ({
    options: {
      chart: {
        id: 'vuechart-example'
        
      },
      theme: {
        palette: 'palette3'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [{
      name: 'Publications',
      data: [60, 10, 35, 50, 12, 60, 70, 91]
    }],
    donutSeries: [20, 20, 20, 20, 20]
   
  })
} 
</script>
