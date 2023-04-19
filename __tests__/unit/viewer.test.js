const app = require('../../app.js');
const supertest = require('supertest');
const testsAgent = supertest.agent(app);

beforeAll( async () => {
  console.log('Running viewer tests.');
});

describe('Test MPS Viewer Healthcheck', () => {
  test('Successful response from healthcheck route', async () => {
    const response = await testsAgent.get('/healthcheck')
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
    expect(response.body.hasOwnProperty('message'));
    expect(response.body['message']).toBeDefined();
    expect(response.body['message']).not.toBeNull();
  });
});

describe('Test MPS Viewer Homepage', () => {
  test('Successful response from homepage route', async () => {
    const response = await testsAgent.get('/')
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});

describe('Test MPS Viewer 404', () => {
  test('Successful 404 response', async () => {
    const response = await testsAgent.get('/abc/123')
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(404);
  });
});

describe('Test MPS Viewer Route Legacy', () => {
  test('Successful response from viewer route legacy', async () => {
    let objectType = 'ids';
    let objectId = '42929359';

    const legacyManifestBaseUrl = process.env.LEGACY_MANIFEST_BASEURL || `https://iiif.lib.harvard.edu/manifests`;
    const manifestId = `${legacyManifestBaseUrl}/${objectType}:${objectId}`;

    const response = await testsAgent.get(`/viewer?manifestId=${manifestId}`)
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});

describe('Test MPS Viewer Successful Example Route', () => {
  test('Successful response from example route', async () => {
    let recordIdentifier = 'HUAM140429_URN-3:HUAM:INV012574P_DYNMC';
    const response = await testsAgent.get(`/example/legacy/${recordIdentifier}`)
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});

describe('Test MPS Viewer Failed Example Route', () => {
  test('Failed response from example route', async () => {
    let recordIdentifier = '12345';
    const response = await testsAgent.get('/example/legacy/'+ recordIdentifier)
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});

describe('Test MPS Viewer Route MPS manifest v2', () => {
  test('Successful response from viewer route MPS manifest v2', async () => {
    const manifestId = 'https://mps.lib.harvard.edu/iiif/2/URN-3:FHCL:100252142';
    const response = await testsAgent.get(`/viewer?manifestId=${manifestId}`)
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});

describe('Test MPS Viewer Route MPS manifest v3', () => {
  test('Successful response from viewer route MPS manifest v3', async () => {
    const manifestId = 'https://mps.lib.harvard.edu/iiif/3/URN-3:FHCL:100252142';
    const response = await testsAgent.get(`/viewer?manifestId=${manifestId}`)
      .catch(function (error) {
        console.log(error);
      });
    expect(response.status).toBe(200);
  });
});
