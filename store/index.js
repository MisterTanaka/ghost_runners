import Axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.BASE_API_URL;

export const state = () => ({
  tables: [],
  tableId: null
});

export const getters = {
  getTables(state) {
    return state.tables;
  },
  getTable(state) {
    let ta = _.find(state.tables, t => {
      return t._id === state.tableId;
    });
    return ta;
  },
  generateUrl: state => baseUrl => {
    return `${baseUrl}/${state.tableId}`;
  },
  generateStaticUrl: state => (baseUrl, param) => {
    return `${baseUrl}/${param}`;
  }
};

export const mutations = {
  setTables(state, data) {
    state.tables = data;
  },
  setTable(state, data) {
    state.tableId = data._id;
  }
};

export const actions = {
  async INSERT_TABLE({ commit }, table) {
    let payload = null;
    if (table.is_new) {
      payload = await Axios.post(`${baseUrl}/tables`, table);
    } else {
      payload = await Axios.patch(`${baseUrl}/tables/${table.id}`, table);
    }

    return new Promise((resolve, reject) => {
      if (payload.status === 201) {
        resolve(payload.data);
      } else {
        reject(payload.message);
      }
    });
  },
  async LOAD_TABLES({ commit }) {
    const { data } = await Axios.get(`${baseUrl}/tables`);
    commit('setTables', data);
  },
  async LOAD_TABLE({ commit }, payload) {
    const { data } = await Axios.get(`${baseUrl}/tables/${payload.id}`);
    commit('setTable', data);
  }
};
