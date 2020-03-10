import Axios from 'axios';
const baseUrl = process.env.BASE_API_URL;

export const state = () => ({});

export const mutations = {};

export const actions = {
  async INSERT_TABLE({ commit }, table) {
    const { data } = await Axios.post(`${baseUrl}/tables`, table);
  },
};
