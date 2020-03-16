require('dotenv').config();
const axios = require('axios');
const baseUrl = process.env.BASE_API_URL;

let rowID = null;

describe('Test suite for checking the rows route', () => {
  test('create data set to test the create route', async () => {
    const postData = {
      table: '5e67087d2649d8615848efd9',
      rows: [
        {
          'columns 1': 'String test',
          'columns 2': 'String test 2',
          'columns 3': 101,
        },
      ],
    };
    const res = await axios.post(`${baseUrl}/rows/`, postData);
    rowID = res.data.rows._id;
    expect(rowID).toBeDefined();
  });

  test('get all rows from get all row route', async () => {
    const res = await axios.get(`${baseUrl}/rows/`);
    expect(res.data.length).toBeGreaterThan(0);
  });
});
