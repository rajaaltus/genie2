export const state = () => ({	
	newAbout: {},
});

export const mutations = {
	SET_ABOUT_DATA (state, newAbout) {
		state.newAbout = newAbout;
	}
};

export const actions = {
	async setAboutData ({commit}, {query}) {
		// console.log('Calling get dep profile api');
		await this.$axios.$get(`/department-profiles?${query}`)
			.then(response =>  {
				//  console.log(response[0]);
				// handle success
				commit("SET_ABOUT_DATA", response);
			})
			.catch((e) => {
				// handle error
				// commit("SET_ABOUT_DATA", error);
			})
			.finally(function () {
				// always executed
			});
	},
	async addProfile ({commit}, payload) {
	
		await this.$axios.$post('/department-profiles', payload)
			.then(response =>  {
			// handle success
				commit("SET_ABOUT_DATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_ABOUT_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async updateAbout ({commit}, payload) {
		await this.$axios.$put(`/department-profiles/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_ABOUT_DATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_ABOUT_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	}
};

