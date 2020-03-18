import Axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.BASE_API_URL;

export const state = () => ({
  rows: [],
  rowId: null,
});

export const getters = {
  getRows(state) {
    let rows = _.cloneDeep(state.rows);
    return rows;
  },
  getRow(state) {
    let row = _.find(state.rows, r => {
      return r._id === state.rowId;
    });
    return row;
  },
};

export const mutations = {
  setRows(state, data) {
    state.rows = data[0];
  },
  setRow(state, data) {
    state.rowId = data._id;
  },
};

export const actions = {
  async INSERT_ROW({ commit }, payload) {
    let rows = null;
    if (payload.is_new) {
      rows = await Axios.post(`${baseUrl}/rows`, payload);
    } else {
      rows = await Axios.patch(`${baseUrl}/rows/${payload.rowId}`, payload);
    }
    commit('setRows', [rows.data.updatedRow]);

    return new Promise((resolve, reject) => {
      if (rows.status === 200) {
        resolve(rows.data);
      } else {
        reject(rows.message);
      }
    });
  },
  async LOAD_ROWS({ commit }, payload) {
    let rows = null;
    if (payload.tableId) {
      rows = await Axios.get(`${baseUrl}/rows/tableId/${payload.tableId}`);
    } else {
      rows = await Axios.get(`${baseUrl}/rows/`);
    }

    commit('setRows', rows.data);
    return;
  },
};
