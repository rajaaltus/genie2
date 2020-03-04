<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" /> 
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
  }
} 
</script>
