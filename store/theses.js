
export const state = () => ({
	
	thesesData: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters =  {
	thesesData (state) {
		return state.thesesData;
	}
};

export const mutations = {
	
	SET_THESESDATA (state, thesesData) {
		if (thesesData && Array.isArray(thesesData)) {
			state.thesesData.success = true;
			state.thesesData.result = thesesData;
			state.thesesData.error = {};
		} else {
			console.log('error'+thesesData);
			state.thesesData.success = false;
			state.thesesData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};

export const actions = {
	async setThesesData ({commit}, {qs}) {
		 await this.$axios.$get(`/theses?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_THESESDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_THESESDATA", error);
			})
			.finally(function () {
			// always executed
			});

		  
	},
	async thesesAdd ({commit}, payload) {
		await this.$axios.$post('/theses', payload)
			.then(response =>  {
			// handle success
				commit("SET_THESESDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_THESESDATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async updateTheses ({commit}, payload) {
		await this.$axios.$put('/theses', payload)
			.then(response =>  {
			// handle success
				commit("SET_THESESDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_THESESDATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteTheses ({commit}, {id}) {
		await this.$axios.$delete(`/theses/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_THESESDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_THESESDATA", error);
			})
			.finally(function () {
			// always executed
			});
	
	}
};

