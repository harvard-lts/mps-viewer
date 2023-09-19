const app = require('../../app.js');
const supertest = require('supertest');
const sinon = require('sinon');
const embedCtrl = require('../../controllers/embed.ctrl');
const httpCtrl = require('../../controllers/http.ctrl');
const consoleLogger = require('../../logger/logger.js').console;

// Unit tests are isolated tests that can be run within this container
// and must not have any dependencies on any other services
describe('API routes', () => {
  // Initialize supertest agent with app.js
  let testsAgent = supertest.agent(app);

  it('Should return healthcheck', (done) => {
    testsAgent
      .get('/healthcheck')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        expect.anything(res);
        expect(res.status).toBe(200)
        done();
      });
  });
  
  it('Should return 200 when manifest route succeeds', (done) => {
    testsAgent
      .get('/example/manifest/?manifestId=https://iiif.lib.harvard.edu/manifests/drs:7065335')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        expect.anything(res);
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should return 200 when mps route succeeds', (done) => {
    testsAgent
      .get('/example/mps/URN-3:DIV.LIB:29999858?manifestVersion=3&prod=1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        expect.anything(res);
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should return 200 when viewer route succeeds', (done) => {
    testsAgent
      .get('/viewer/?manifestId=https://mps.lib.harvard.edu/iiif/3/URN-3:DIV.LIB:29999858')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        expect.anything(res);
        expect(res.status).toBe(200);
        done();
      });
  });

});
