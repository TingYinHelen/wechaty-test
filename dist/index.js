'use strict';

require('babel-polyfill');

var _wechaty = require('wechaty');

var _apiai = require('apiai');

var _apiai2 = _interopRequireDefault(_apiai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _apiai2.default)('46a33e7a9cb741fb96e0dcc3d2d03a6c');
var bot = _wechaty.Wechaty.instance({ profile: '大妹子' });

bot.on('scan', function (url, code) {
  _wechaty.log.info(url);
}).on('login', function (user) {
  _wechaty.log.info(user + ' is login');
}).on('friend', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(contact, request) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!request) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return request.accept();

          case 3:
            _context.next = 5;
            return contact.say('您好，我是 FCC（freeCodeCamp成都社区）的姜姜姜，很高兴认识你*^_^*回复暗号”FCC成都社区”， 加入FCC成都社区群。直接聊天，请随意…');

          case 5:
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
            // if(m.self()){
            //   return;
            // }
            fromContact = m.from();
            fromContent = m.content();
            room = m.room();
            noAtMention = fromContent.replace(/@\w+/ig, '');
            roomTopic = void 0;
            request = app.textRequest(noAtMention, {
              sessionId: '1234567890'
            });


            request.on('error', function (error) {
              _wechaty.log.error(error);
            });

            // console.log(fromContent)


            request.on('response', function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(response) {
                var speech, keyroom;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        speech = response.result.fulfillment.speech;

                        if (!/freeCodeCamp成都/.test(fromContent)) {
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 4;
                        return _wechaty.Room.find({ topic: 'FreeCodeCamp-成都' });

                      case 4:
                        keyroom = _context2.sent;

                        if (!keyroom) {
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 8;
                        return keyroom.add(fromContact);

                      case 8:
                        _context2.next = 10;
                        return keyroom.say('\u6B22\u8FCE @' + fromContact.name() + ' \u52A0\u5165FCC(freecodecamp)\u6210\u90FD\u793E\u533A*^_^*');

                      case 10:
                        m.type() == 10000 && m.say('@Helen 抢红包！');

                      case 11:
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

          case 9:
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