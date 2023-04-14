const https = require('https');
const axios = require('axios');
const httpCtrl = require('./http.ctrl');

const embedCtrl = {};

embedCtrl.getEmbed = async (recordIdentifier) => {

  // Set request values that are specific to this route
  const requestOptionsData = {
    method: 'GET',
    url: `${process.env.EMBED_BASE_URL}/api?recordIdentifier=${recordIdentifier}`
  };

  return httpCtrl.makeRequest(requestOptionsData);

};

module.exports = embedCtrl;
