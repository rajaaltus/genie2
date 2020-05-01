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
    <!-- <pre>{{aboutData}}</pre> -->
    <pre>{{diagnosticsData}}</pre>
   <FinalEditor :content="formattedAbout + formattedClinical + formattedEmergency + sectionA + sectionB + sectionC +  sectionD + sectionE + sectionF" />
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
      savedData: state => state.report.generatedReport,
      aboutData: state => state.about.newAbout[0],
      clinicalData: state => state.clinical.clinicalData.result,
      emergencyData: state => state.emergency.emergencyData,
      diagnosticsData: state => state.diagnostic.diagnosticsData
    }),
    formattedAbout() {
      return `
       <h1>1. ABOUT THE DEPARTMENT</h1>${this.aboutData.introduction}<br>
       <h6>${this.aboutData.facilities}<br>
      `
    },
    formattedClinical() {
      let sum =0;
      return `
      <h1>2. PATIENT CARE ACTIVITIES</h1>
      <h2> A. Clinical Services</h2>
      <table>
      <tr>
      <th colspan="3">Clinical Services</th>
      <th>No.Of Patients /Cases</th>
      </tr>
      <tr>
      <td>Screenings</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.screenings,0)}</td>
      </tr>
      <tr>
      <td>Registrations</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.registrations,0)}</td>
      </tr>
      <tr>
      <td>followups</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.followups,0)}</td>
      </tr>
      <tr>
      <td>Admissions</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.admissions,0)}</td>
      </tr>
      <tr>
      <td>Discharges</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.discharges,0)}</td>
      </tr>
      <tr>
      <td>Deaths</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.deaths,0)}</td>
      </tr>
      <tr>
      <td>Emergencies</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.emergencies,0)}</td>
      </tr>
      <tr>
      <td>External Reference</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.external_ref,0)}</td>
      </tr>
      <tr>
      <td>Internal Reference</td>
      <td>${this.clinicalData.reduce((sum, item) => sum + item.internal_ref,0)}</td>
      </tr>
      </table>
      `
    },
    formattedEmergency() {
      let sum =0;
      return `
      <h2> B. Emergency Services</h2>
      <table>
      <tr>
      <th colspan="3">Emergency Services</th>
      <th>No.Of Patients /Cases</th>
      </tr>
      
      <td>Registrations</td>
      <td>${this.emergencyData.reduce((sum, item) => sum + item.registrations,0)}</td>
      </tr>
      <tr>
      <td>Admissions</td>
      <td>${this.emergencyData.reduce((sum, item) => sum + item.admissions,0)}</td>
      </tr>
      <tr>
      <td>Deaths</td>
      <td>${this.emergencyData.reduce((sum, item) => sum + item.deaths,0)}</td>
      </tr>
      <tr>
      <td>External Reference</td>
      <td>${this.emergencyData.reduce((sum, item) => sum + item.external_ref,0)}</td>
      </tr>
      <tr>
      <td>Internal Reference</td>
      <td>${this.emergencyData.reduce((sum, item) => sum + item.internal_ref,0)}</td>
      </tr>
      </table>
      `
    },
    // formattedDiagnostics() {
    //   let arrays = [];
    //   arrays = Object.assign([],this.diagnosticsData)
    //   return this.arrays
    //     .map(
    //       item => item.lab_type
    //     )

    //   // `
    //   // <h2> C. Diagnostic Services</h2>
    //   // <table>
    //   // <tr>
    //   // <th colspan="3">Lab Services</th>
    //   // <th>Total No.Of Samples Analyzed</th>
    //   // </tr>
    //   // <tr>
    //   // <td>${}</td>
    //   // <td></td>
    //   // </tr>
    //   // </table>
    //   // `
    // },
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
    let queryString = '';
    queryString = `department.id=${store.state.auth.user.department}&annual_year=2019`
    await store.dispatch('about/setAboutData', {query: queryString})
    await store.dispatch('clinical/setClinicalData', {qs: queryString})
    await store.dispatch('emergency/setEmergencyData', {qs: queryString})
    await store.dispatch('diagnostic/setDiagnosticData', {qs: queryString})
  },
  
}
</script>