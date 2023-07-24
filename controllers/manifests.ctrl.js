const httpCtrl = require('./http.ctrl');
const consoleLogger = require('../logger/logger.js').console;

const manifestsCtrl = {};

manifestsCtrl.getManifest = async (manifestUrl) => {

  // Set request values that are specific to this route
  const requestOptionsData = {
    method: 'GET',
    url: manifestUrl
  };

  return httpCtrl.makeRequest(requestOptionsData);

};

module.exports = manifestsCtrl;