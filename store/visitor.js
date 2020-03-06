
export const state = () => ({
	// programmesData: []
	visitorsData: {
		success: false,
		result: [],
		error: {},
	}
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
	}
};

export const actions = {
	async setVisitorsData ({commit}, {qs}) {
		 await this.$axios.$get(`/visitors?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				console.log(error);
				commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
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
			// handle error
				console.log(error);
				commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
		// commit('SET_VISITORSDATA', programmesData)
	},
	async updateVisitor ({commit}, payload) {
		await this.$axios.$put('/visitors', payload)
			.then(response =>  {
			// handle success
				commit("SET_VISITORSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				// console.log(error);
				commit("SET_VISITORSDATA", error);
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
				commit("SET_VISITORSDATA", error);
			})
			.finally(function () {
			// always executed
				console.log('finally');
			});
	}
};

