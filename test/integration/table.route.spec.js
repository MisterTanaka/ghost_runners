require('dotenv').config();
const axios = require('axios');
const baseUrl = process.env.BASE_API_URL;

let tableID = null;

describe('Test suite for checking the tables route', () => {
  test('create data set to test the create route', async () => {
    const postData = {
      name: 'Test random table',
      description: 'a random table to test the flow of the app',
      columns: [
        { column_name: 'Testing items name', column_type: 'String' },
        { column_name: 'Testing items rank', column_type: 'Number' },
      ],
    };
    const res = await axios.post(`${baseUrl}/tables/`, postData);
    tableID = res.data.table._id;
    expect(tableID).toBeDefined();
  });

  test('get all tables from get all table route', async () => {
    const res = await axios.get(`${baseUrl}/tables/`);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test('update a table from the update table route', async () => {
    const postData = {
      name: 'New Test random table',
      description: 'a newer random table to test the flow of the app',
    };
    const res = await axios.patch(`${baseUrl}/tables/${tableID}`, postData);
    expect(res.data.status).toBeDefined();
  });

  test('get specific table from the get table by id route', async () => {
    const res = await axios.get(`${baseUrl}/tables/${tableID}`);
    expect(res.data).toBeDefined();
  });

  test('delete extra table from the delete table by id', async () => {
    const res = await axios.delete(`${baseUrl}/tables/${tableID}`);
    expect(res.data.message).toBe('Deleted This Table');
  });
});
