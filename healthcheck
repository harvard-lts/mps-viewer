#!/usr/bin/env node
const http = require('http');
const https = require('https');
const URL = require('url').URL;
 
const healthArguments = process.argv;
var healthCheckURL;

if (healthArguments.length === 2) { 
    healthCheckURL = new URL(process.env.HEALTHCHECK_URL);
}  else { 
    healthCheckURL = new URL(healthArguments[2]);
} 
 
const healthCheckProtocol = healthCheckURL.protocol;
const healthCheckURLReq = { 
    host: healthCheckURL.hostname,
    port: healthCheckURL.port,
    path: healthCheckURL.pathname,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  };
 
 
let healthCheckResponse;
function processResponse(res) { 
    console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
};    
 
if(healthCheckProtocol=='https:') {
    healthCheckResponse = https.get(healthCheckURLReq, (res) => { 
        processResponse(res) 
    });
} else { 
    healthCheckResponse = http.get(healthCheckURLReq, (res) => {
       processResponse(res);
    });
}
 
healthCheckResponse.on('error', function (err) {
    console.error('Error in Completing Health Check Request');
    console.error(err);
    process.exit(1);
});
 
healthCheckResponse.end(); 