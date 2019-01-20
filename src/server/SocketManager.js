const io = require('./index.js').io;

const { USER_CONNECTED, VERIFY_USER, USER_DISCONNECTED } = require('../Events');
const { createUser, createMessage, createChat } = require('../Factories');

const connectedUsers = {};

function nicknameExists(nickname) {
    return nickname in connectedUsers;
}

function removeUser(nickname) {
    delete connectedUsers[nickname];
}

function addUser(user) {
    connectedUsers[user.nickname] = user;
}

module.exports = function (socket) {
  console.log("CONNECTED: Socket Id = " + socket.id);

  socket.on(VERIFY_USER, (nickname, callback) => {
      if (nicknameExists(nickname)) {
          callback({ user: null, nicknameExists: false});
      }
      else {
          callback({ user: createUser(nickname), nicknameExists: true});
      }
  });
};