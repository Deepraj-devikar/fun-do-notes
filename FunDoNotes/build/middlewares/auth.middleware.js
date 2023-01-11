"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _auth = require("../config/auth");
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var userAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, _yield$jwt$verify, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          bearerToken = req.header('Authorization');
          if (bearerToken) {
            _context.next = 4;
            break;
          }
          throw {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: 'Authorization token is required'
          };
        case 4:
          bearerToken = bearerToken.split(' ')[1];
          _context.next = 7;
          return _jsonwebtoken["default"].verify(bearerToken, _auth.authSecretKey);
        case 7:
          _yield$jwt$verify = _context.sent;
          user = _yield$jwt$verify.user;
          res.locals.user = user;
          res.locals.token = bearerToken;
          next();
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function userAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.userAuth = userAuth;