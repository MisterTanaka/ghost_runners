import Axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.BASE_API_URL;

export const state = () => ({});

export const getters = {
  isObjEmpty: state => obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  },
  sanitizeObj: state => (obj, sanitizeFunc) => {
    let newObj = {};
    for (let [key, value] of Object.entries(obj)) {
      newObj[key] = sanitizeFunc(value);
    }
    return newObj;
  },
  stringToKey: state => str => {
    return str.replace(/ /g, '_').toLowerCase();
  },
  inputType: state => type => {
    let returnType = '';
    switch (type) {
      case 'String':
        returnType = 'text';
        break;
      case 'Number':
        returnType = 'number';
        break;
      default:
        returnType = 'text';
        break;
    }
    return returnType;
  },
};
