import { createStore } from 'vuex';
import axios from 'axios';

import type { 
  CachedRequest, 
  Character, 
  FetchCharactersPayload, 
  RootState 
} from '../typings';
import { getErrorMessage, getQueryString } from '../utils';

import { BASE_URL } from './const';

const store = createStore<RootState>({
  state () {
    return {
      cachedRequest: {},
      characters: [],
      isLoading: false,
      isFilterLoading: false,
      isPageLoading: false,
      totalPages: 0,
    };
  },
  getters: {},
  mutations: {
    cacheRequest(state, payload: CachedRequest) {
      state.cachedRequest[payload.queryKey] = payload.data;
    },
    clearCharacters(state) {
      state.characters = [];
      state.totalPages = 1;
    },
    setCharacters(state, payload: Character | Character[]) {
      if(Array.isArray(payload)) {
        state.characters = payload;
      } else {
        state.characters = [payload];
      }
    },
    setFilterLoadingStatus(state, payload: boolean) {
      state.isFilterLoading = payload;
    },
    setLoadingStatus(state, payload: boolean) {
      state.isLoading = payload;
    },
    setPageLoadingStatus(state, payload: boolean) {
      state.isPageLoading = payload;
    },
    setTotalPages(state, payload: number) {
      state.totalPages = payload;
    },
  },
  actions: {
    async fetchData(context, queryString: string) {
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

        const queryString = getQueryString(payload);
        const cachedData = this.state.cachedRequest[queryString];

        if(cachedData) {
          context.commit('setCharacters', cachedData.data);
          context.commit('setTotalPages', cachedData.info.totalPages);

          context.commit('setLoadingStatus', false);
          return;
        }

        const result = await context.dispatch('fetchData', queryString);

        if(result) {
          context.commit('setCharacters', result.data);
          context.commit('setTotalPages', result.info.totalPages);

          context.commit('cacheRequest', { queryKey: queryString, data: result });
        }

        context.commit('setLoadingStatus', false);
    },
    async filterCharacters(context, payload: FetchCharactersPayload) {
      context.commit('setFilterLoadingStatus', true);

      const queryString = getQueryString(payload);
      const cachedData = this.state.cachedRequest[queryString];

      if(cachedData) {
        context.commit('setCharacters', cachedData.data);
        context.commit('setTotalPages', cachedData.info.totalPages);

        context.commit('setFilterLoadingStatus', false);
        return;
      }

      const result = await context.dispatch('fetchData', queryString);

      if(result) {
        context.commit('setCharacters', result.data);
        context.commit('setTotalPages', result.info.totalPages);

        context.commit('cacheRequest', { queryKey: queryString, data: result });
      }
     
      context.commit('setFilterLoadingStatus', false);
    },
    async getChosenPage(context, payload: FetchCharactersPayload) {
      context.commit('setPageLoadingStatus', true);

      const queryString = getQueryString(payload);
      const cachedData = this.state.cachedRequest[queryString];

      if(cachedData) {
        context.commit('setCharacters', cachedData.data);
        context.commit('setTotalPages', cachedData.info.totalPages);

        context.commit('setPageLoadingStatus', false);
        return;
      }

      const result = await context.dispatch('fetchData', queryString);

      if(result) {
        context.commit('setCharacters', result.data);

        context.commit('cacheRequest', { queryKey: queryString, data: result });
      }

      context.commit('setPageLoadingStatus', false);
    },
  },
});

export default store;