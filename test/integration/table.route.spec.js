const axios = require('axios');
const baseUrl = process.env.BASE_API_URL;

describe('Test suite for checking the tables route', () => {
  test('can get all of the existing tables', async () => {
    const res = await axios.get(`${baseUrl}/tables/all`);
    expect(res.data).toBeGreaterThan(0);
  });
});
