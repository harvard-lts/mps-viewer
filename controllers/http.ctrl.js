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

  let response = {};
  try {
    response = await axios(requestOptions);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      consoleLogger.error(JSON.stringify(error.response.data));
      consoleLogger.error(error.response.status);
      consoleLogger.error(JSON.stringify(error.response.headers));
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      consoleLogger.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      consoleLogger.error(error.message);
    }
    return response.error = `HTTP request error url: ${requestOptionsData.url}`;
  }

  return response;

}

module.exports = httpCtrl;
