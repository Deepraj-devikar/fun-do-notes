"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = exports.loginUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(4).required(),
    lastName: _joi["default"].string().min(4).required(),
    email: _joi["default"].string().email({
      tlds: {
        allow: false
      }
    }),
    password: _joi["default"].string().min(6).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
exports.newUserValidator = newUserValidator;
var loginUserValidator = function loginUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email({
      tlds: {
        allow: false
      }
    }),
    password: _joi["default"].string().min(6).required()
  });
  var _schema$validate2 = schema.validate(req.body),
    error = _schema$validate2.error,
    value = _schema$validate2.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
exports.loginUserValidator = loginUserValidator;