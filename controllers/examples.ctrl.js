const consoleLogger = require('../logger/logger.js').console;
const fsPromises = require('fs').promises;
const path = require('path');

const examplesCtrl = {};

examplesCtrl.getExamples = async () => {
    
    const data = await fsPromises.readFile(path.join(__dirname, '..', 'config', 'example-items.json'))
        .catch((err) => console.error('Failed to read file', err));

    return JSON.parse(data.toString());
};

module.exports = examplesCtrl;