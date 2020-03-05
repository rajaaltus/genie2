<template>
  <v-app>
    <PageHeader :title="$metaInfo.title" />
    <pre>
      {{this.$store.state.user.fullUser}}
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
  },
  async fetch({store}) {
    let userId = store.state.auth.user.id;
    await store.dispatch('user/setFullUser', {id: userId})
  }
}
</script>
