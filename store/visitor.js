const limit = '&_limit=1000';
export const state = () => ({
	// programmesData: []
	visitorsData: {
		success: false,
		result: [],
		error: {},
	},
	visitorsCount: 0,
	visitorError: {}
});

export const getters =  {
	visitorsData (state) {
		return state.visitorsData;
	}
};

export const mutations = {
	
	SET_VISITORSDATA (state, visitorsData) {
		if (visitorsData && Array.isArray(visitorsData)) {
			state.visitorsData.success = true;
			state.visitorsData.result = visitorsData;
			state.visitorsData.error = {};
		} else {
			// console.log('error'+visitorsData);
			state.visitorsData.success = false;
			state.visitorsData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_VISITORS_COUNT (state, visitorsCount) {
		state.visitorsCount = visitorsCount;
	},
	SET_ERROR (state, visitorError) {
		state.visitorError = visitorError;
	}
};

export const actions = {
	async setVisitorsData ({commit}, {qs}) {
		 await this.$axios.$get(`/visitors?${qs}${limit}`)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				console.log(error);
				// commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	},
	async countVisitors ({commit}, {qs}) {
		await this.$axios.$get(`/visitors/count?${qs}`)
		 .then(response =>  {
		 // handle success
			 commit("SET_VISITORS_COUNT", response);
		 })
		 .catch((e) => {
		 // handle error
			//  commit("SET_VISITORS_COUNT", error);
		 })
		 .finally(function () {
		 // always executed
		 });
 },
	async addVisitor ({commit}, payload) {
		await this.$axios.$post('/visitors', payload)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
				commit("SET_ERROR", response);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
		// commit('SET_VISITORSDATA', programmesData)
	},
	async updateVisitor ({commit}, payload) {
		await this.$axios.$put(`/visitors/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				// console.log(error);
				// commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
		// commit('SET_VISITORSDATA', programmesData)
	},
	async deleteVisitor ({commit}, {id}) {
		await this.$axios.$delete(`/visitors/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				console.log(response);
			})
			.catch((e) => {
			// handle error
				console.log(error);
				// commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				console.log('finally');
			});
	}
};

