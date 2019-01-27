const io = require('./index.js').io;

const Event = require('../Events');
const { createUser, createMessage, createChat } = require('../Factories');

let connectedUsers = [];
const publicChat = createChat();

function nicknameExists(nickname) {
    return connectedUsers.some(user => user.nickname === nickname) || nickname == "SYSTEM";
}

function removeUser(nickname) {
    connectedUsers = connectedUsers.filter(user => user.nickname !== nickname);
}

function getUser(nickname) {
    return connectedUsers.find(user => user.nickname === nickname);
}

function addUser(user) {
    connectedUsers.push(user);
}

module.exports = function (socket) {
  console.log("CONNECTED: Socket Id = " + socket.id);

  socket.on(Event.VERIFY_USER, (nickname, callback) => {
      if (nicknameExists(nickname)) {
          callback(null, true);
      }
      else {
          callback(createUser(nickname, socket.id), false);
      }
  });

  socket.on(Event.USER_CONNECTED, (user) => {
     user.socketId = socket.id;
      addUser(user);
     socket.user = user;
     io.emit(Event.USER_CONNECTED, connectedUsers);
     io.emit(Event.MESSAGE_RECEIVED+"-"+publicChat.id, createMessage(user.nickname + " has connected.", "SYSTEM"));
  });

  socket.on(Event.PUBLIC_CHAT, (callback) => callback(publicChat));

  socket.on(Event.MESSAGE_SENT, (message, chatId) => {
      console.log(message, chatId);
      let eventName = Event.MESSAGE_RECEIVED+"-"+chatId;
      console.log(eventName);
     io.emit(eventName, message);
  });

  socket.on(Event.PRIVATE_MESSAGE, (sender, receiver) => {
     if (nicknameExists(receiver)) {
         const newChat = createChat([], [sender, receiver], sender + ", " + receiver);
         const receiverSocketId = getUser(receiver).socketId;
         socket.to(receiverSocketId).emit(Event.PRIVATE_MESSAGE, newChat);
         socket.emit(Event.PRIVATE_MESSAGE, newChat);
     }
  });

  socket.on('disconnect', function () {
      if (!!socket.user) {
          removeUser(socket.user.nickname);
          io.emit(Event.USER_DISCONNECTED, connectedUsers);
          io.emit(Event.MESSAGE_RECEIVED+"-"+publicChat.id, createMessage(socket.user.nickname + " has disconnected.", "SYSTEM"));
      }
  });
};