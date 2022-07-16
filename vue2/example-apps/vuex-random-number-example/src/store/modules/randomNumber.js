import { getRandomNumber } from '@/services/RandomNumberService.js';

export default {
  namespaced: true,
  state: () => ({
    num: 0
  }),
  mutations: {
    SET_NUM(state, value) {
      state.num = value;
    },
    INCREMENT_NUM(state, increment) {
      state.num += increment;
    },
    DECREMENT_NUM(state, decrement) {
      state.num -= decrement;
    }
  },
  actions: {
    async getNewRandomValue({ commit }, { min = 0, max = 1 }) {
      let number;
      commit('loadingModule/SET_LOADING', true, { root: true });
      try {
        const response = await getRandomNumber();
        number = response.number;
      } catch (error) {
        number = Math.random();
      } finally {
        number = Math.round(number * (max - min)) + min;
        commit('SET_NUM', number);
        commit('loadingModule/SET_LOADING', false, { root: true });
      }
    },
    incrementValue({ commit }, increment) {
      commit('INCREMENT_NUM', increment);
    },
    decrementValue({ commit }, decrement) {
      commit('DECREMENT_NUM', decrement);
    }
  }
};
