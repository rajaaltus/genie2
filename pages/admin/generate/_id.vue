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
   <FinalEditor :content="sectionA + sectionB + sectionC +  sectionD + sectionE + sectionF" />
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
      if (this.savedData.section_a)
        return this.savedData.section_a
    },
    sectionB() {
      if (this.savedData.section_a)
        return this.savedData.section_b
    },
    sectionC() {
      if (this.savedData.section_c)
        return this.savedData.section_c
    },
    sectionD() {
      if (this.savedData.section_d)
        return this.savedData.section_d
    },
    sectionE() {
      if (this.savedData.section_e)
        return this.savedData.section_e
    },
    sectionF() {
      if (this.savedData.section_f)
        return this.savedData.section_f
    }

  },
  async fetch({store, params}) {
    await store.dispatch('report/getById', {id: params.id});
  },
  
}
</script>