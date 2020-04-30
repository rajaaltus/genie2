<template>
  <div>
    <PageHeader :title="$metaInfo.title" />
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader"
export default {
  head() {
    return {
      title: 'Generated Report'
    }
  },
  components: {
    PageHeader
  }
  
}
</script>