<template>
  <div>
    <PageHeader :title="$metaInfo.title" />
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="2">
        <v-btn color="green" class="mr-2" small>Copy</v-btn>
        <v-btn color="primary" small>Save PDF</v-btn>
      </v-col>
    </v-row>
   <FinalEditor :content="savedData.section_a+savedData.section_b+savedData.section_c+savedData.section_d+savedData.section_e+savedData.section_f" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from "@/components/PageHeader"
import FinalEditor from "@/components/FinalEditor"
export default {
  head() {
    return {
      title: 'Generated Report'
    }
  },
  components: {
    PageHeader,
    FinalEditor
  },
  data() {
    return {
      reportData: []
    }
  },
  computed: {
    ...mapState({
      savedData: state => state.report.generatedReport
    }),
    sectionA() {
      return this.savedData.sectionA;
    }
  },
  async fetch({store, params}) {
    await store.dispatch('report/getById', {id: params.id});
  },
  
}
</script>