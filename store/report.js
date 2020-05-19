const limit = '&_limit=1000';
export const state = () => ({
  savedReport: null,
  errors:{},
  reportId: 0,
  generatedReport: null,
  availableReports: null
	
});

export const mutations = {
  INITIALIZE_REPORT_ID(state, val) {
    state.reportId = val;
  },
  SET_REPORTS(state, savedReport) {
    state.savedReport = savedReport;
    state.reportId = savedReport[0].id;
  },
  SET_POST_REPORTS(state, response) {
    state.savedReports = response;
    state.reportId = response.id;
  },
  SET_GEN_REPORT(state, response) {
    state.generatedReport = response;
  },
  SET_REPORT_ERRORS(state, response) {
     //console.log('Error: ', response.data.data.errors);
     state.errors =  response;
  },
  SET_AVAILABLE_REPORTS(state, response) {
    state.availableReports = response;
  },
  
};

export const actions =  {
  async setAvailableReports({commit}, {qs}) {
    await this.$axios.$get(`/saved-reports?${qs}`)
    .then(response => {
      commit("SET_AVAILABLE_REPORTS", response);
    })
    .catch((e)=> {
    });
  },
  async getById({commit}, {id}) {
    await this.$axios.$get(`/saved-reports/${id}`)
    .then(response=> {
      commit("SET_GEN_REPORT", response);
    })
    .catch((e)=>{
    })
    .finally(function () {
      console.log('finally!');
		});
  },
  async initializeReportId({commit}, val) {
    commit("INITIALIZE_REPORT_ID", val);
  },
  async setSavedReport({commit}, {fq}) {
    await this.$axios.$get(`/saved-reports?${fq}`)
    .then(response=> {
      commit("SET_REPORTS", response);
    })
    .catch((e)=>{
      commit("SET_REPORT_ERRORS", e.response);  
    })
    .finally(function () {
      console.log('finally!');
		});

  },
  async addReport({commit}, payload) {
    await this.$axios.$post('/saved-reports', payload)
    .then(response=> {
      commit("SET_POST_REPORTS", response);
    })
    .catch((e)=>{
      commit("SET_REPORT_ERRORS", e.response);  
    })
    .finally(function () {
      console.log('finally!');
		});
  },
  async updateReport({commit}, payload) {
    await this.$axios.$put(`/saved-reports/${payload.id}`, payload)
    .then(response=> {
      commit("SET_REPORTS", response);
    })
    .catch((e)=>{
      commit("SET_REPORT_ERRORS", e.response);  
    })
    .finally(function () {
      console.log('finally!');
		});
  }
};
