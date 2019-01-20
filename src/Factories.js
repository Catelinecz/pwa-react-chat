const uuid = require('uuid/v5');

/**
 * Vytvori uzivatele
 * @param name
 * @returns {{nickname: string}}
 */
const createUser = ({name = ""} = {})=>(
    {
        nickname: name
    }
);

/**
 * Vytvori zpravu
 * @param message
 * @param sender
 * @param recipient
 * @returns {{sender: string, recipient: string, message: string, datetime: Date}}
 */
const createMessage = ({message = "", sender = "", recipient = ""} = { })=>(
    {
        sender: sender,
        recipient: recipient,
        message: message,
        datetime: new Date(Date.now())
    }
);

/**
 * Vytvori chatovou mistnost
 * @param messages
 * @param users
 * @param title
 * @returns {{id: *, title: string, users: Array, messages: Array, typingUsers: Array}}
 */
const createChat = ({messages = [], users = [], title = "Public"} = {})=>(
    {
        id: uuid(),
        title: title,
        users: users,
        messages: messages,
        typingUsers: []
    }
);


/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
*/
const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat,
    createUser
}