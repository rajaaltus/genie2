const limit = '&_limit=1000';
export const state = () => ({
	
	savedReports: {
		success: false,
		result: [],
		error: {},
  },
  reportId: 0,
  generatedReport: null
	
});

export const mutations = {
  INITIALIZE_REPORT_ID(state, val) {
    state.reportId = val;
  },
  SET_REPORTS(state, response) {
    state.savedReports.success = true;
    state.reportId = response[0].id;
    state.savedReports.result = response;
    
  },
  SET_GEN_REPORT(state, response) {
    state.generatedReport = response;
  },
  SET_REPORT_ERRORS(state, response) {
     //console.log('Error: ', response.data.data.errors);
     state.savedReports.error =  response;
  }
};

export const actions =  {
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
      commit("SET_REPORTS", response);
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
