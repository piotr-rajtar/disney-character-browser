import { createStore } from 'vuex';
import axios from 'axios';

import type { FetchCharactersPayload } from '../typings';
import { getQueryString } from '../utils';

import { BASE_URL } from './const';

const store = createStore({
  state () {
    return {
      characters: [],
    };
  },
  getters: {},
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    }
  },
  actions: {
    async fetchCharacters(context, payload: FetchCharactersPayload) {
      try {
        const queryString = getQueryString(payload);
        const result = await axios.get(`${BASE_URL}?${queryString}`);
        context.commit('setCharacters', result.data.data);
      }
      catch(error) {
        console.error('error');
      }
    }
  },
});

export default store;