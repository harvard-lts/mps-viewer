const winston = require('winston');
const path = require('path');
const os = require('os');
const hostname = os.hostname();
const rfs = require('rotating-file-stream');
require('winston-daily-rotate-file');
const dateFns = require('date-fns');

const logger = {};

logger.logLevel = process.env.APP_LOG_LEVEL || 'debug';

logger.dateFormatStr = 'yyyy-MM-dd';

logger.dateNow = dateFns.format(new Date(), logger.dateFormatStr);

logger.skipRoutes = [
  "/version",
  "/healthcheck",
  "/robots.txt",
  "/favicon.ico"
];

let consoleTransports = '';
if (process.env.LOG_TO_STDOUT === 'false') {
    consoleTransports = [
        new winston.transports.DailyRotateFile(
            {
                filename: `logs/${hostname}/console/%DATE%-console.log`,
                datePattern: 'yyyy-MM-DD',
                maxSize: '20m',
                maxFiles: '14d'
            }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
}
else {
    consoleTransports = [
        new winston.transports.Console({ format: winston.format.simple() })
    ];
}

logger.skipLogs = (req, res) => {
  let skipLogsAnswer = false;
  logger.skipRoutes.forEach(routeToSkip => {
    if (req.originalUrl && req.originalUrl.indexOf(routeToSkip) > -1) {
      skipLogsAnswer = true;
    }
  });
  return skipLogsAnswer;
}

// Console logs and errors write to file using winston
logger.console = winston.createLogger({
  level: logger.logLevel,
  format: winston.format.json(),
  transports: consoleTransports
});

if (process.env.LOG_TO_STDOUT === 'false') {
    // API request logs write to file config
    logger.requestLogStream = rfs.createStream(`./${hostname}_request_${logger.dateNow}.log`, {
    interval: '1d', // Rotate daily
    maxFiles: 30, // Maximum number of rotated files to keep in storage
    path: path.join(__dirname, `../logs`)
    });
}

module.exports = logger;
