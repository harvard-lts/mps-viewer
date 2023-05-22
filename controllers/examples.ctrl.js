const consoleLogger = require('../logger/logger.js').console;
const fs = require('fs');
const path = require('path');

const examplesCtrl = {};

examplesCtrl.getExamples = async () => {
    let examples;
    fs.readFile(path.join(__dirname, '..', 'config', 'example-items.json'), 'utf8', function (err, data) {
    if (err) throw err;
    consoleLogger.info('DATA!');
    consoleLogger.info(data);
    //examples = await JSON.parse(data);
    return JSON.parse(data);
    });

    //consoleLogger.info(path.join(__dirname, '..', 'config', 'example-items.json'));
    //consoleLogger.info('EXAMPLES!');
    //consoleLogger.info(examples);

};

module.exports = examplesCtrl;