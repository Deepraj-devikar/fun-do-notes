"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appErrorHandler = appErrorHandler;
exports.genericErrorHandler = genericErrorHandler;
exports.notFound = notFound;
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _logger = _interopRequireDefault(require("../config/logger"));
/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
function notFound(req, res) {
  res.status(_httpStatusCodes["default"].NOT_FOUND).json({
    code: _httpStatusCodes["default"].NOT_FOUND,
    message: 'Ooops, route not found'
  });
}

/**
 * Error response middleware for handling all app errors except generic errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
// eslint-disable-next-line no-unused-vars
function appErrorHandler(err, req, res, next) {
  if (err.code && typeof err.code === 'number') {
    _logger["default"].error("\n      status - ".concat(err.code, "\n      message - ").concat(err.message, " \n      url - ").concat(req.originalUrl, " \n      method - ").concat(req.method, " \n      IP - ").concat(req.ip, "\n    "));
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else {
    next(err);
  }
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
// eslint-disable-next-line no-unused-vars
function genericErrorHandler(err, req, res, next) {
  _logger["default"].error("\n    status - ".concat(_httpStatusCodes["default"].INTERNAL_SERVER_ERROR, " \n    message - ").concat(err.stack, " \n    url - ").concat(req.originalUrl, " \n    method - ").concat(req.method, " \n    IP - ").concat(req.ip, "\n  "));
  res.status(_httpStatusCodes["default"].INTERNAL_SERVER_ERROR).json({
    code: _httpStatusCodes["default"].INTERNAL_SERVER_ERROR,
    data: '',
    message: err.message
  });
}