export const state = () => ({
  selectedYear: 0,
});

export const mutations = {
  SET_REPORTING_YEAR (state, selectedYear) {
		state.selectedYear = selectedYear;
  }
};

export const actions = {
  async setReportingYear ({commit}, selectedYear) {
		commit ('SET_REPORTING_YEAR', selectedYear);
	},
};
