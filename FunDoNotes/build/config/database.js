"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
var database = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var DATABASE;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Replace database value in the .env file with your database config url
          DATABASE = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE;
          _context.next = 4;
          return _mongoose["default"].connect(DATABASE, {
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        case 4:
          _logger["default"].info('Connected to the database.');
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          _logger["default"].error('Could not connect to the database.', _context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function database() {
    return _ref.apply(this, arguments);
  };
}();
var _default = database;
exports["default"] = _default;