const httpCtrl = require('./http.ctrl');
const consoleLogger = require('../logger/logger.js').console;

const embedCtrl = {};

embedCtrl.getEmbed = async (uniqueIdentifier, manifestType = 'mps', manifestVersion = '3', height = 700, width = 1200, productionOverride = '') => {

  let embedUrl = process.env.EMBED_BASE_URL;

  switch(manifestType) {
    case 'legacy':
      embedUrl += `/api/legacy?recordIdentifier=${uniqueIdentifier}&height=${height}&width=${width}`
      break;
    case 'mps':
      embedUrl += `/api/mps?urn=${uniqueIdentifier}&manifestVersion=${manifestVersion}&height=${height}&width=${width}&prod=${productionOverride}`;
      break;
    case 'nrs':
      embedUrl += `/api/nrs?urn=${uniqueIdentifier}&manifestVersion=${manifestVersion}&height=${height}&width=${width}&prod=${productionOverride}`;
      break;      
    case 'manifest':
      embedUrl += `/api/manifest?manifestId=${uniqueIdentifier}&manifestVersion=${manifestVersion}&height=${height}&width=${width}`;
  }

  consoleLogger.info('embedUrl');
  consoleLogger.info(embedUrl);

  // Set request values that are specific to this route
  const requestOptionsData = {
    method: 'GET',
    url: embedUrl
  };

  let data, record;
  try {
    data = await httpCtrl.makeRequest(requestOptionsData);
  } catch(e) {
    consoleLogger.error(e);
    throw new Error(e);
  }

  return data;

};

module.exports = embedCtrl;
