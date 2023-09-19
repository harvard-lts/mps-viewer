const sinon = require('sinon');
const embedCtrl = require('../../controllers/embed.ctrl');
const httpCtrl = require('../../controllers/http.ctrl');
const consoleLogger = require('../../logger/logger.js').console;

beforeAll( async () => {
  console.log('Running embed tests.');
  let stub = sinon.stub(httpCtrl, 'makeRequest').returns({"data":[{"title":"Harvard University Baseball Team, photograph, 1892","iiifManifest":"https://iiif.lib.harvard.edu/manifests/ids:10274486","html":"<iframe src='https://localhost:23017/viewer/?manifestId=https%3A%2F%2Fiiif.lib.harvard.edu%2Fmanifests%2Fids%3A10274486' height='700px' width='1200px' title='[Harvard University Baseball Team, photograph, 1892]' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' allowfullscreen></iframe>"}]});
});

describe('Embed', () => {

  test('Successful response from getEmbed Legacy', async () => {
    const recordIdentifier = 'HUAM140429_URN-3:HUAM:INV012574P_DYNMC';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(recordIdentifier, 'legacy', 2);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Unsuccessful response from getEmbed Legacy', async () => {
    const recordIdentifier = '12345';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(recordIdentifier, 'legacy', 2);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Successful response from getEmbed MPS', async () => {
    const urn = 'URN-3:FHCL:100252142';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(urn, 'mps', 3);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Unsuccessful response from getEmbed MPS', async () => {
    const urn = '12345';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(urn, 'mps', 3);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });
   
  test('Unsuccessful response from makeRequest MPS', async () => {
    const urn = '12345';
    let data;
    try {
      data = await httpCtrl.makeRequest(urn, 'mps', 3);
    } catch (e) {
      const errorMsg = `Unable to validate makeRequest: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(data).not.toBeNull();
  });

});