import Axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.BASE_API_URL;

export const state = () => ({
  tags: [],
  tagId: null
});

export const getters = {
  getTags(state) {
    let tags = _.cloneDeep(state.tags);
    return tags;
  },
  getTag(state) {
    const tag = _.find(state.tags, r => {
      return r._id === state.tagId;
    });
    return tag;
  }
};

export const mutations = {
  addNewTag(state, data) {
    state.tags.push(data);
  },
  setTags(state, data) {
    state.tags = data;
  },
  setTag(state, data) {
    state.tagId = data._id;
  }
};

export const actions = {
  async INSERT_TAG({ commit }, payload) {
    let tag = null;
    tag = await Axios.post(`${baseUrl}/tags`, payload);
    commit('addNewTag', tag.data.tag);

    return new Promise((resolve, reject) => {
      if (tag.data.status === 201) {
        resolve(tag.data);
      } else {
        reject(tag.message);
      }
    });
  },
  async LOAD_TAGS({ commit }, payload) {
    let tags = null;
    tags = await Axios.get(`${baseUrl}/tags/`);
    commit('setTags', tags.data);
    return;
  }
};
