"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.newUser = exports.getUser = exports.getLoginData = exports.getAllUsers = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _auth = require("../config/auth");
//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].find();
        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

//create new user
exports.getAllUsers = getAllUsers;
var newUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var salt, hashedPassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _bcrypt["default"].genSalt(_auth.saltRounds);
        case 2:
          salt = _context2.sent;
          _context2.next = 5;
          return _bcrypt["default"].hash(body.password, salt);
        case 5:
          hashedPassword = _context2.sent;
          body.password = hashedPassword;
          _context2.next = 9;
          return _user["default"].create(body);
        case 9:
          data = _context2.sent;
          return _context2.abrupt("return", data);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function newUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

//update single user
exports.newUser = newUser;
var updateUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _user["default"].findByIdAndUpdate({
            _id: _id
          }, body, {
            "new": true
          });
        case 2:
          data = _context3.sent;
          return _context3.abrupt("return", data);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function updateUser(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

//delete single user
exports.updateUser = updateUser;
var deleteUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _user["default"].findByIdAndDelete(id);
        case 2:
          return _context4.abrupt("return", '');
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function deleteUser(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

//get single user
exports.deleteUser = deleteUser;
var getUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _user["default"].findById(id);
        case 2:
          data = _context5.sent;
          return _context5.abrupt("return", data);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUser(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

//get single user in login data by login details and also checking login is correct or not
exports.getUser = getUser;
var getLoginData = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(body) {
    var user, isMatchedPassword;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          user = _context6.sent;
          if (user) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", {
            error: 1,
            status: 404,
            message: "User Not found."
          });
        case 5:
          _context6.next = 7;
          return _bcrypt["default"].compare(body.password, user.password);
        case 7:
          isMatchedPassword = _context6.sent;
          if (isMatchedPassword) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", {
            error: 1,
            status: 401,
            message: "Invalid Password!"
          });
        case 10:
          return _context6.abrupt("return", {
            error: 0,
            status: 200,
            ok: 'ok',
            message: "Login successfull",
            user: user
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getLoginData(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getLoginData = getLoginData;