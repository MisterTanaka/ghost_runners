import Axios from 'axios';

const baseUrl = process.env.BASE_API_URL;

export const state = () => ({
  tables: [],
});

export const getters = {
  getTables(state) {
    return state.tables;
  },
};

export const mutations = {
  setTables(state, data) {
    state.tables = data;
  },
};

export const actions = {
  async INSERT_TABLE({ commit }, table) {
    const { data } = await Axios.post(`${baseUrl}/tables`, table);
    return new Promise((resolve, reject) => {
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(data.message);
      }
    });
  },
  async LOAD_TABLES({ commit }) {
    const { data } = await Axios.get(`${baseUrl}/tables`);
    commit('setTables', data);
  },
};
