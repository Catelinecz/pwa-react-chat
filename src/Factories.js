const uuidv4 = require('uuid/v4');

/**
 * Vytvori uzivatele
 * @param name
 * @returns {{nickname: string}}
 */
const createUser = (nickname, socketId)=>(
    {
        nickname: nickname,
        socketId: socketId
    }
)

/**
 * Vytvori zpravu
 * @param message
 * @param sender
 * @param recipient
 * @returns {{sender: string, recipient: string, message: string, datetime: Date}}
 */
const createMessage = (message = "", sender = "")=>(
    {
        id: uuidv4(),
        sender: sender,
        message: message,
        datetime: new Date(Date.now()).toLocaleString(undefined, {day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'})
    }
);

/**
 * Vytvori chatovou mistnost
 * @param messages
 * @param users
 * @param title
 * @returns {{id: *, title: string, users: Array, messages: Array, typingUsers: Array}}
 */
const createChat = (messages = [], users = [], title = "Public")=>(
    {
        id: uuidv4(),
        title: title,
        users: users,
        messages: messages,
        typingUsers: []
    }
);

module.exports = {
    createMessage,
    createChat,
    createUser
}