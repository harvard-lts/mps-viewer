const https = require('https');
const axios = require('axios');

const embedCtrl = {};

embedCtrl.getEmbed = async (recordIdentifier) => {
    let result = {};

    let response;

    let rejectUnauthorizedCert = true;
    if (process.env.REJECT_UNAUTHORIZED_CERT === 'false') {
      rejectUnauthorizedCert = false;
    }
    // At instance level
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: rejectUnauthorizedCert
      })
    });

    try {
      response = await instance.get(process.env.EMBED_BASE_URL+'/api?recordIdentifier='+recordIdentifier);
    } catch(e) {
      const errorMsg = e.response && e.response.data ? e.response.data : e.code;
      console.log(errorMsg);
      result.error = errorMsg;
      result.status = result.error.status || 500;
      result.data = {};
      return result;
    }
  
    result.error = '';
    result.status = response && response.status || 500;
    result.data = response && response.data || {};

     return result;
};

module.exports = embedCtrl;