<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
    <template>
      <v-row>
        <v-col cols="12" md="12" lg="6">
          <div id="vuechart-example">
            <apexchart width="80%" type="bar" :options="barOptions" :series="series"></apexchart>
          </div>
        </v-col>
        <v-col cols="12" md="12" lg="6">
          <div>
            <apexchart width="80%" type="donut" :options="donutOptions" :series="series"></apexchart>
          </div>
        </v-col>
      </v-row>
      
      
    
</template>
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
    barOptions: {
      
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91]
    }],
    donutOptions: {},
    series: [44, 55, 41, 17, 15]      
  })
} 
</script>
