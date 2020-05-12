<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <ApprovalActivities />
      </v-col>
      <v-col cols="12" lg="9">
        <nuxt-child />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader"
import ApprovalActivities from "@/components/ApprovalActivities"
import Program from "@/components/approvals/Program"
export default {
  head() {
    return {
      title: "Approvals"
    };
  },
  components: {
    PageHeader,
    ApprovalActivities,
    Program
  },
  data() {
    return {
      
    };
  },
  async fetch({store}) {
    await store.dispatch('setApprovalActivities')
  }
};
</script>
