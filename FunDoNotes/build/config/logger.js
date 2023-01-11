"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logStream = exports["default"] = void 0;
var _winston = _interopRequireWildcard(require("winston"));
require("winston-daily-rotate-file");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Logger handles all logs in the application
 */
var logger = _winston["default"].createLogger({
  format: _winston.format.combine(_winston.format.timestamp(), _winston.format.simple()),
  colorize: true,
  transports: [new _winston["default"].transports.File({
    filename: 'logs/server/error.log',
    level: 'error',
    handleExceptions: true
  }), new _winston["default"].transports.File({
    filename: 'logs/server/all.log',
    level: 'info',
    handleExceptions: true
  }), new _winston["default"].transports.DailyRotateFile({
    maxFiles: '14d',
    level: 'info',
    dirname: 'logs/server/daily',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%.log'
  }), new _winston["default"].transports.Console({
    level: 'debug',
    json: false,
    handleExceptions: true
  })]
});

/**
 * morganLogger logs all http request in a dedicated file and on console
 */
var morganLogger = _winston["default"].createLogger({
  format: _winston.format.combine(_winston.format.simple()),
  transports: [new _winston["default"].transports.File({
    filename: 'logs/requests/all.log',
    level: 'debug',
    handleExceptions: true
  }), new _winston["default"].transports.Console({
    level: 'debug',
    json: false,
    handleExceptions: true
  }), new _winston["default"].transports.DailyRotateFile({
    maxFiles: '14d',
    level: 'info',
    dirname: 'logs/requests/daily',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%.log'
  })]
});
var logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write: function write(message) {
    morganLogger.info(message.toString());
  }
};
exports.logStream = logStream;
var _default = logger;
exports["default"] = _default;