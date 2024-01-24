const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
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
      new transports.DailyRotateFile(
        {
          filename: `${hostname}_console_%DATE%.log`,
          dirname: `logs`,
          dateFormat: logger.dateFormatStr,
          maxSize: '20m',
          maxFiles: '14d'
        }),
      new transports.Console({ format: format.simple() })
    ]
}
else {
    consoleTransports = [
      new transports.Console({ format: format.simple() })
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

const loggerFormat = printf(info => {
  if(info instanceof Error) {
      return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}`;
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Console logs and errors write to file using winston
logger.console = createLogger({
  level: logger.logLevel,
  format: combine(
    format.splat(),
    timestamp(),
    loggerFormat
  ),
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