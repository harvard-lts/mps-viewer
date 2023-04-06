const axios = require('axios');
const https = require('https');
const app = require('../../app.js');
const supertest = require('supertest');

axios.defaults.adapter = 'http';
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

beforeAll( async () => {
    console.log('Running healthcheck tests.');
});

/**
 * Smoke tests
 * @group smoke
 */
 describe('Test MPS Embed Healthcheck', () => {
    test('Successful response from healthcheck route', async () => {
        const converter_healthcheck_route = process.env.EMBED_BASE_URL + '/healthcheck';
        const response = await axios.get(converter_healthcheck_route)
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(200);
        expect(response.data.hasOwnProperty('message'));
        expect(response.data['message']).toBeDefined();
        expect(response.data['message']).not.toBeNull();
    });
});

describe('Test MPS Viewer Healthcheck', () => {
    test('Successful response from healthcheck route', async () => {
        let testsAgent = supertest.agent(app);
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
        let testsAgent = supertest.agent(app);
        const response = await testsAgent.get('/')
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(200);
    });
});

describe('Test MPS Viewer 404', () => {
    test('Successful 404 response', async () => {
        let testsAgent = supertest.agent(app);
        const response = await testsAgent.get('/abc/123')
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(404);
    });
});

describe('Test MPS Viewer Route', () => {
    test('Successful response from viewer route', async () => {
        let testsAgent = supertest.agent(app);
        let objectType = 'ids';
        let objectId = '42929359';
        const response = await testsAgent.get('/viewer/'+ objectType +'/'+ objectId)
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(200);
    });
});

describe('Test MPS Viewer Successful Example Route', () => {
    test('Successful response from example route', async () => {
        let testsAgent = supertest.agent(app);
        let recordIdentifier = 'HUAM140429_URN-3:HUAM:INV012574P_DYNMC';
        const response = await testsAgent.get('/example/'+ recordIdentifier)
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(200);
    });
});

describe('Test MPS Viewer Failed Example Route', () => {
    test('Failed response from example route', async () => {
        let testsAgent = supertest.agent(app);
        let recordIdentifier = '12345';
        const response = await testsAgent.get('/example/'+ recordIdentifier)
            .catch(function (error) {
                console.log(error);
            });
        expect(response.status).toBe(200);
    });
});