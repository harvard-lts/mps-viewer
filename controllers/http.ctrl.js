const https = require('https');
const axios = require('axios');
const consoleLogger = require('../logger/logger.js').console;

const httpCtrl = {};

httpCtrl.setApiRequestOptions = (requestOptionsData) => {

  const agent = new https.Agent({
    requestCert: true,
    // SSL certificate verification
    rejectUnauthorized: process.env.HTTPS_REJECT_UNAUTHORIZED === 'false' ? false : true
  });

  let options = {
    url: requestOptionsData.url || null,
    headers: requestOptionsData.headers || {},
    method: requestOptionsData.method || `GET`,
    httpsAgent: agent
  }

  if (requestOptionsData.jwt) {
    options.headers.Authorization = `Bearer ${requestOptionsData.jwt}`
  }

  if (requestOptionsData.params) {
    options.params = requestOptionsData.params;
  }

  if (requestOptionsData.data) {
    options.data = requestOptionsData.data;
  }

  if (requestOptionsData.responseType) {
    options.responseType = requestOptionsData.responseType;
  }

  return options;

}

httpCtrl.makeRequest = async (requestOptionsData) => {

  // Set request options
  const requestOptions = httpCtrl.setApiRequestOptions(requestOptionsData);

  consoleLogger.debug(`HTTP request url: ${requestOptionsData.url}`);

  let response;
  try {
    response = await axios(requestOptions);
  } catch (e) {
    let errorMsg = e.response && e.response.data ? e.response.data : e.code;
    consoleLogger.error(JSON.stringify(errorMsg));
    throw new Error(errorMsg);
  }

  return response;

}

module.exports = httpCtrl;
