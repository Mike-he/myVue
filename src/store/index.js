import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	API_URL: 'http://mm.diandianboke.com:8080',
	JSESSIONID: '',
};

const getters = {
	getJSESSIONID(state) {
		return state.JSESSIONID;
	}
};

const mutations = {
	setJSESSIONID(state, val) {
		state.JSESSIONID = val;
	}
};

const actions = {
	setJSESSIONID(context, val) {
		context.commit('setJSESSIONID', val);
	}
};

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
