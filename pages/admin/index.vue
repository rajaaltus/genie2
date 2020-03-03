<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" />
    <pre>
      {{this.$store.state.auth.user}}
    </pre>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  head() {
    return {
      title: 'Dashboard'
    }
  }, 
  components: {
    PageHeader
  }
}
</script>
