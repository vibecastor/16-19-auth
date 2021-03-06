'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveImageMock = exports.pCreateImageMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _accountMock = require('./account-mock');

var _image = require('../../model/image');

var _image2 = _interopRequireDefault(_image);

var _account = require('../../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//

/*eslint-disable-line*/
var pCreateImageMock = function pCreateImageMock() {
  var resultMock = {};
  return (0, _accountMock.pCreateAccountMock)().then(function (mockAcctResponse) {
    resultMock.accountMock = mockAcctResponse;

    return new _image2.default({
      artist: _faker2.default.lorem.words(1),
      url: _faker2.default.random.words(1),
      genre: _faker2.default.random.words(1),
      camera: _faker2.default.random.words(1),
      account: resultMock.accountMock.account._id
    }).save();
  }).then(function (image) {
    resultMock.image = image;
    return resultMock;
  });
}; //


var pRemoveImageMock = function pRemoveImageMock() {
  return Promise.all([_account2.default.remove({}), _image2.default.remove({})]);
};

exports.pCreateImageMock = pCreateImageMock;
exports.pRemoveImageMock = pRemoveImageMock;