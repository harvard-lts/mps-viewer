const httpCtrl = require('./http.ctrl');
const consoleLogger = require('../logger/logger.js').console;

const embedCtrl = {};

embedCtrl.getEmbed = async (uniqueIdentifier, manifestType = 'mps', manifestVersion = '3') => {

  let embedUrl = process.env.EMBED_BASE_URL;

  if (manifestType === 'legacy') {
    embedUrl += `/api/legacy?recordIdentifier=${uniqueIdentifier}`
  } else {
    embedUrl += `/api/mps?urn=${uniqueIdentifier}&manifestVersion=${manifestVersion}`;
  }

  consoleLogger.info('embedUrl');
  consoleLogger.info(embedUrl);

  // Set request values that are specific to this route
  const requestOptionsData = {
    method: 'GET',
    url: embedUrl
  };

  return httpCtrl.makeRequest(requestOptionsData);

};

module.exports = embedCtrl;
