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
  getRowByRandom: state => rows => {
    let percentArray = [];
    const weightArray = _.map(rows, (row, index) => {
      return { id: index, weigth: parseInt(row.weigth) };
    });

    const totalweigth = _(weightArray)
      .map(row => {
        return row.weigth;
      })
      .sum();

    let cumulative_percentage = 0;
    _.forEach(weightArray, (weight_row, index) => {
      const percent = (weight_row.weigth / totalweigth) * 100;
      percentArray[index] = [
        cumulative_percentage,
        cumulative_percentage + parseInt(percent)
      ];
      cumulative_percentage += parseInt(percent);
    });

    const seed = Math.round(Math.random() * 100);
    let rowIndex = 0;
    _.forEach(percentArray, (weight_row, index) => {
      if (seed > weight_row[0] && seed < weight_row[1]) {
        rowIndex = index;
      }
    });
    return rowIndex;
  }
};
