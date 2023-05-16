import { createStore } from 'vuex';
import axios from 'axios';

import type { FetchCharactersPayload, RootState } from '../typings';
import { getQueryString } from '../utils';

import { BASE_URL } from './const';

const store = createStore<RootState>({
  state () {
    return {
      characters: [],
      isLoading: false,
      isFilterLoading: false,
      totalPages: 0,
    };
  },
  getters: {},
  mutations: {
    clearCharacters(state) {
      state.characters = [];
      state.totalPages = 1;
    },
    setCharacters(state, payload) {
      if(Array.isArray(payload)) {
        state.characters = payload;
      } else {
        state.characters = [payload];
      }
    },
    setFilterLoadingStatus(state, payload) {
      state.isFilterLoading = payload;
    },
    setLoadingStatus(state, payload) {
      state.isLoading = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
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
        context.commit('setTotalPages', result.data.info.totalPages);
      }
      catch(error) {
        context.commit('setLoadingStatus', false);
        console.error('error');
      }
    },
    async filterCharacters(context, payload: FetchCharactersPayload) {
      try {
        context.commit('setFilterLoadingStatus', true);
        const queryString = getQueryString(payload);
        const result = await axios.get(`${BASE_URL}?${queryString}`);
        context.commit('setFilterLoadingStatus', false);
        context.commit('setCharacters', result.data.data);
        context.commit('setTotalPages', result.data.info.totalPages);
      }
      catch(error) {
        context.commit('setFilterLoadingStatus', false);
        console.error('error');
      }
    },
    async getDifferentPage(context, payload: FetchCharactersPayload) {
      try {
        const queryString = getQueryString(payload);
        const result = await axios.get(`${BASE_URL}?${queryString}`);
        context.commit('setCharacters', result.data.data);
      }
      catch(error) {
        console.error('error');
      }
    },
  },
});

export default store;