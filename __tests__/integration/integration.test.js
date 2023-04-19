const httpCtrl = require('../../controllers/http.ctrl');

beforeAll( async () => {
  console.log('Running integration tests.');
});

describe('Test MPS Embed Healthcheck', () => {
  test('Successful response from healthcheck route', async () => {

    const embedHealthcheckRoute = process.env.EMBED_BASE_URL + '/healthcheck';

    const requestOptionsData = {
      method: 'GET',
      url: embedHealthcheckRoute
    };

    let response;
    try {
      response = await httpCtrl.makeRequest(requestOptionsData);
    } catch (e) {
      console.log(e);
    }

    expect(response.status).toBe(200);
    expect(response.data.hasOwnProperty('message'));
    expect(response.data['message']).toBeDefined();
    expect(response.data['message']).not.toBeNull();
  });
});
