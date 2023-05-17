import { createStore } from 'vuex';
import axios from 'axios';

import type { FetchCharactersPayload, RootState } from '../typings';
import { getErrorMessage, getQueryString } from '../utils';

import { BASE_URL } from './const';

const store = createStore<RootState>({
  state () {
    return {
      characters: [],
      isLoading: false,
      isFilterLoading: false,
      isPageLoading: false,
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
    setPageLoadingStatus(state, payload) {
      state.isPageLoading = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
  },
  actions: {
    async fetchData(context, payload: FetchCharactersPayload) {
      const queryString = getQueryString(payload);
      try {
        const result = await axios.get(`${BASE_URL}?${queryString}`);
        return result.data;
      } catch(error) {
        context.commit('setLoadingStatus', false);
        getErrorMessage(error);
      }
    },
    async fetchCharacters(context, payload: FetchCharactersPayload) {
        context.commit('setLoadingStatus', true);

        const result = await context.dispatch('fetchData', payload);

        context.commit('setCharacters', result.data);
        context.commit('setTotalPages', result.info.totalPages);
       
        context.commit('setLoadingStatus', false);
    },
    async filterCharacters(context, payload: FetchCharactersPayload) {
      context.commit('setFilterLoadingStatus', true);

      const result = await context.dispatch('fetchData', payload);

      context.commit('setCharacters', result.data);
      context.commit('setTotalPages', result.info.totalPages);
     
      context.commit('setFilterLoadingStatus', false);
    },
    async getChosenPage(context, payload: FetchCharactersPayload) {
      context.commit('setPageLoadingStatus', true);

      const result = await context.dispatch('fetchData', payload);

      context.commit('setCharacters', result.data);

      context.commit('setPageLoadingStatus', false);
    },
  },
});

export default store;