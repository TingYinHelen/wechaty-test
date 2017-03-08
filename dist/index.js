'use strict';

require('babel-polyfill');

var _wechaty = require('wechaty');

var _apiai = require('apiai');

var _apiai2 = _interopRequireDefault(_apiai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _apiai2.default)('00f9824dcbcd4c4bb08c02fb6b319343');
var bot = _wechaty.Wechaty.instance();

bot.on('scan', function (url, code) {
  console.log(url);
}).on('login', function (user) {
  console.log(user + ' is login');
}).on('friend', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(contact, request) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!request) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return request.accept();

          case 3:
            console.log(contact.name() + '\u8BF7\u6C42\u52A0\u4E3A\u597D\u53CB\uFF0C\u5DF2\u63A5\u53D7');

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).on('message', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(m) {
    var fromContact, fromContent, room, noAtMention, roomTopic, request;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!m.self()) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return');

          case 2:
            fromContact = m.from();
            fromContent = m.content();
            room = m.room();
            noAtMention = fromContent.replace(/@\w+/ig, '');
            roomTopic = void 0;

            if (!room) {
              _context3.next = 11;
              break;
            }

            roomTopic = room.topic();

            if (!(roomTopic == '美鶴代の伝説' || roomTopic == "Wechaty Developers' Home" || roomTopic == '一起调戏iChat')) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt('return');

          case 11:
            request = app.textRequest(noAtMention, {
              sessionId: '1234567890'
            });


            request.on('error', function (error) {
              console.log(error);
            });
            request.on('response', function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(response) {
                var speech, keyroom;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        speech = response.result.fulfillment.speech;

                        console.log(speech);

                        if (!/大妹最可爱/.test(fromContent)) {
                          _context2.next = 11;
                          break;
                        }

                        _context2.next = 5;
                        return _wechaty.Room.find({ topic: '大妹最可爱' });

                      case 5:
                        keyroom = _context2.sent;

                        if (!keyroom) {
                          _context2.next = 11;
                          break;
                        }

                        _context2.next = 9;
                        return keyroom.add(fromContact);

                      case 9:
                        _context2.next = 11;
                        return keyroom.say('\u5927\u59B9\u6700\u7231' + fromContact.name(), fromContact);

                      case 11:
                        m.say(speech);

                      case 12:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());
            request.end();

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}()).init();