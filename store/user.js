export const state = () => ({
	busy: false,
	loggedIn: false,
	strategy: "local",
	user: false,
	fullUser: {},
	userProfile: [],
	departments: {
		success: false,
		result: [],
		error: {},
	},
	usersList: {
		success: false,
		result: [],
		error: {},
	},
	activeUsersList: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters = {
	authenticated (state) {
		return state.loggedIn;
	},

	user (state) {
		return state.user;
	}
};

export const mutations = {
	SET_USERPROFILE (state, userProfile) {
		state.userProfile = userProfile;
	},
	SET_FULL_USER (state, fullUser) {
		state.fullUser = fullUser;
		state.avatarUrl = fullUser.avatar.url;
	},
	SET_DEPT_DATA (state, departments) {
		if (departments && Array.isArray(departments) ) {
			state.departments.success = true;
			state.departments.result = departments;
			state.departments.error = {};
		} else {
			// console.log('error'+departments);
			state.departments.success = false;
			state.departments.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_USERS_LIST (state, usersList) {
		if (usersList && Array.isArray(usersList)) {
			state.usersList.success = true;
			state.usersList.result = usersList;
			state.usersList.error = {};
		} else {
			state.usersList.success = false;
			state.usersList.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_ACTIVE_USERS_LIST (state, activeUsersList) {
		if (activeUsersList && Array.isArray(activeUsersList)) {
			state.activeUsersList.success = true;
			state.activeUsersList.result = activeUsersList;
			state.activeUsersList.error = {};
		} else {
			state.activeUsersList.success = false;
			state.activeUsersList.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};


export const actions = {
	async addUser ({commit}, payload) {
		await this.$axios.$post('/users', payload)
		.then(response =>  {
			// handle success
				return true;
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteUser ({commit}, {id}) {
		await this.$axios.$delete(`/users/${id}`)
		.then(response =>  {
			// handle success
				return true;
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async updateUser ({commit}, payload) {
		await this.$axios.$put(`/users/${payload.id}`, payload)
		.then(response =>  {
			// handle success
				return true;
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
			});
	},

	async addProfile ({commit}, payload) {
		await this.$axios.$post('/user-profiles', payload)
			.then(response =>  {
			// handle success
				commit("SET_USERPROFILE", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async setFullUser ({commit}, {id}) {
		await this.$axios.$get(`/users/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_FULL_USER", response);
			})
			.catch((e) => {
			// handle error
				//commit("SET_FULL_USER", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	},
	async updateUserProfile ({commit}, payload) {
		await this.$axios.$put(`/user-profiles/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_USERPROFILE", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async setUsersList ({commit}, {qs}) {
		await this.$axios.$get(`/users?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_USERS_LIST", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERS_LIST", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	},
	async setActiveUsersList ({commit}, {qs}) {
		await this.$axios.$get(`/users?${qs}`)
			.then(response =>  {
			// handle success
				commit("SET_ACTIVE_USERS_LIST", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_ACTIVE_USERS_LIST", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	},

	async getAllDepartment ({commit}, departments) {
		await this.$axios.$get('/departments') 
			.then(response =>  {
			// handle success
				commit("SET_DEPT_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_DEPT_DATA", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	},
	async setUserProfile ({commit}, {id}) {
		await this.$axios.$get(`/user-profiles?user.id=${id}`)
			.then(response =>  {
			// handle success
				commit("SET_USERPROFILE", response[0]);
			})
			.catch((e) => {
			// handle error
				// commit("SET_USERPROFILE", error);
			})
			.finally(function () {
			// always executed
				// console.log('finally');
			});
	}
};