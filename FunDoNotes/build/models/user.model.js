"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));
var userSchema = new _mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
userSchema.plugin(_mongooseUniqueValidator["default"]);
var _default = (0, _mongoose.model)('User', userSchema);
exports["default"] = _default;