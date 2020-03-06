
export const state = () => ({
	
	researchData: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters =  {
	researchData (state) {
		return state.researchData;
	}
};

export const mutations = {
	
	SET_RESEARCHDATA (state, researchData) {
		if (researchData && Array.isArray(researchData)) {
			state.researchData.success = true;
			state.researchData.result = researchData;
			state.researchData.error = {};
		} else {
			console.log('error'+researchData);
			state.researchData.success = false;
			state.researchData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};

export const actions = {
	async setResearchData ({commit}, {qs}) {
		 await this.$axios.$get(`/research-activities?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_RESEARCHDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_RESEARCHDATA", error);
			})
			.finally(function () {
			// always executed
			});

		  
	},
	async researchAdd ({commit}, payload) {
		await this.$axios.$post('/research-activities', payload)
			.then(response =>  {
			// handle success
				commit("SET_RESEARCHDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_RESEARCHDATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async updateResearch ({commit}, payload) {
		await this.$axios.$put('/research-activities', payload)
			.then(response =>  {
			// handle success
				commit("SET_RESEARCHDATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_RESEARCHDATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteResearch ({commit}, {id}) {
		await this.$axios.$delete(`/research-activities/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_RESEARCHDATA", response);
				console.log(response);
			})
			.catch((e) => {
			// handle error
				console.log(error);
				commit("SET_RESEARCHDATA", error);
			})
			.finally(function () {
			// always executed
				console.log('finally');
			});
	}
};

