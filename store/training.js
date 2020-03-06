
export const state = () => ({
	// programmesData: []
	trainingsData: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters =  {
	trainingsData (state) {
		return state.trainingsData;
	}
};

export const mutations = {
	
	SET_TRAININGSDATA (state, trainingsData) {
		if (trainingsData && Array.isArray(trainingsData)) {
			state.trainingsData.success = true;
			state.trainingsData.result = trainingsData;
			state.trainingsData.error = {};
		} else {
			// console.log('error'+trainingsData);
			state.trainingsData.success = false;
			state.trainingsData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};

export const actions = {
	async setTrainingsData ({commit}, {qs}) {
		 await this.$axios.$get(`/trainings?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_TRAININGSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				console.log(error);
				commit("SET_TRAININGSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});

		  
	},
	async addTraining ({commit}, payload) {
		await this.$axios.$post('/trainings', payload)
			.then(response =>  {
			// handle success
				commit("SET_TRAININGSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				// console.log(error);
				commit("SET_TRAININGSDATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
		
	},
	async updateTraining ({commit}, payload) {
		await this.$axios.$put('/trainings', payload)
			.then(response =>  {
			// handle success
				commit("SET_TRAININGSDATA", response);
				// console.log(response);
			})
			.catch((e) => {
			// handle error
				//console.log(error);
				commit("SET_TRAININGSDATA", error);
			})
			.finally(function () {
			// always executed
				//console.log('finally');
			});
	},
	async deleteTraining ({commit}, {id}) {
		await this.$axios.$delete(`/trainings/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_TRAININGSDATA", response);
				//console.log(response);
			})
			.catch((e) => {
			// handle error
				//console.log(error);
				commit("SET_TRAININGSDATA", error);
			})
			.finally(function () {
			// always executed
				//console.log('finally');
			});
	}
};

