import { createStore } from 'vuex';
import axios from 'axios';

import type { FetchCharactersPayload } from '../typings';
import { getQueryString } from '../utils';

import { BASE_URL } from './const';

const store = createStore({
  state () {
    return {
      characters: [],
      isLoading: false,
    };
  },
  getters: {},
  mutations: {
    clearCharacters(state) {
      state.characters = [];
    },
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setLoadingStatus(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchCharacters(context, payload: FetchCharactersPayload) {
      try {
        context.commit('setLoadingStatus', true);
        const queryString = getQueryString(payload);
        const result = await axios.get(`${BASE_URL}?${queryString}`);
        context.commit('setLoadingStatus', false);
        context.commit('setCharacters', result.data.data);
      }
      catch(error) {
        context.commit('setLoadingStatus', false);
        console.error('error');
      }
    }
  },
});

export default store;