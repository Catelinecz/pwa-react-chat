(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,a){var n=a(72);e.exports={createMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{id:n(),sender:t,message:e,datetime:new Date(Date.now()).toLocaleString(void 0,{day:"numeric",month:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}},createChat:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Public";return{id:n(),title:a,users:t,messages:e,typingUsers:[]}},createUser:function(e,t){return{nickname:e,socketId:t}}}},37:function(e,t,a){e.exports=a(75)},42:function(e,t,a){},69:function(e,t){},7:function(e,t){e.exports={PUBLIC_CHAT:"PUBLIC_CHAT",USER_CONNECTED:"USER_CONNECTED",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",USER_DISCONNECTED:"USER_DISCONNECTED",VERIFY_USER:"VERIFY_USER",PRIVATE_MESSAGE:"PRIVATE_MESSAGE"}},75:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(33),c=a.n(i),r=a(2),o=a(3),u=a(5),l=a(4),h=a(6),m=(a(42),a(1)),d=a(34),v=a.n(d),E=a(7),p=a.n(E),b=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={nickname:"",error:""},a.handleChange=a.handleChange.bind(Object(m.a)(Object(m.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(Object(m.a)(a))),a.verifyUserCallback=a.verifyUserCallback.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return n.createElement("div",{className:"login"},n.createElement("form",{className:"login-form",onSubmit:this.handleSubmit},n.createElement("label",{htmlFor:"nickname"},n.createElement("h1",null,"Please enter your nickname: ")),n.createElement("input",{type:"text",ref:function(t){return e.textInput=t},id:"nickname",value:this.state.nickname,onChange:this.handleChange,placeholder:"Enter your nickname and press ENTER"}),n.createElement("div",{className:"error"},this.state.error)))}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.state.nickname?this.props.socket.emit(E.VERIFY_USER,this.state.nickname,this.verifyUserCallback):this.handleError("Nickname must not be empty.")}},{key:"handleChange",value:function(e){this.setState({nickname:e.target.value})}},{key:"handleError",value:function(e){this.setState({error:e})}},{key:"verifyUserCallback",value:function(e,t){t?this.handleError("This nickname is already taken."):(this.handleError(null),this.props.connectUser(e))}}]),t}(n.Component),f=a(36),g=function(e){function t(e){return Object(r.a)(this,t),Object(u.a)(this,Object(l.a)(t).call(this,e))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return n.createElement("div",{id:"side-bar"},n.createElement("div",{className:"heading"},n.createElement("h2",null,"Active users:")),n.createElement("div",{className:"users"},this.props.users.map(function(t){return n.createElement("div",{className:"user ",key:t.nickname,onClick:function(){return e.props.privateMessage(t.nickname)}},"# ",t.nickname)})),n.createElement("div",{className:"heading"},n.createElement("h2",null,"Chats:")),n.createElement("div",{className:"users"},this.props.chats.map(function(t){if(t.title){var a=t.messages[t.messages.length-1],s=t.users.find(function(t){return t!==e.props.user.nickname})||"Public",i=e.props.active&&e.props.active.id===t.id?"active":"";return n.createElement("div",{key:t.id,className:"user ".concat(i),onClick:function(){e.props.setActive(t)}},n.createElement("div",{className:"user-info"},n.createElement("div",{className:"name"},s),a&&n.createElement("div",{className:"last-message"},a.message)))}return null})))}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).messageReceived=a.messageReceived.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"messageReceived",value:function(){this.refs.container.scrollTop=this.refs.container.scrollHeight}},{key:"componentDidMount",value:function(){this.messageReceived()}},{key:"componentDidUpdate",value:function(){this.messageReceived()}},{key:"render",value:function(){var e=this;return n.createElement("div",{className:"thread-container",ref:"container"},n.createElement("div",{className:"thread"},this.props.messages.map(function(t,a){return e.renderMessage(t)})))}},{key:"renderMessage",value:function(e){e.sender,e.text;var t=e.datetime;return n.createElement("div",{key:e.id,className:"message-container "+(e.sender===this.props.user.nickname&&"right")},n.createElement("div",{className:"data"},n.createElement("div",{className:"message"},e.message),n.createElement("div",{className:"time"},e.sender),n.createElement("div",{className:"time"},t)))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={message:""},a.handleChange=a.handleChange.bind(Object(m.a)(Object(m.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.sendMessage(this.state.message),this.setState({message:""})}},{key:"handleChange",value:function(e){this.setState({message:e.target.value})}},{key:"render",value:function(){return n.createElement("div",{className:"message-input"},n.createElement("form",{className:"message-form",onSubmit:this.handleSubmit},n.createElement("input",{id:"message",type:"text",className:"form-control",onChange:this.handleChange,placeholder:"Type your message and press ENTER",value:this.state.message}),n.createElement("button",{disabled:this.state.message.length<1,className:"send",type:"submit"},"Send")))}}]),t}(n.Component),j=a(35),C=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={users:[],chats:[],active:null},a.setActive=a.setActive.bind(Object(m.a)(Object(m.a)(a))),a.sendMessage=a.sendMessage.bind(Object(m.a)(Object(m.a)(a))),a.addChat=a.addChat.bind(Object(m.a)(Object(m.a)(a))),a.usersChanged=a.usersChanged.bind(Object(m.a)(Object(m.a)(a))),a.sendPrivateMessage=a.sendPrivateMessage.bind(Object(m.a)(Object(m.a)(a))),a.props.socket.on(p.a.USER_CONNECTED,a.usersChanged),a.props.socket.on(p.a.USER_DISCONNECTED,a.usersChanged),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"usersChanged",value:function(e){var t=this;this.setState({users:e.filter(function(e){return e.nickname!=t.props.user.nickname})})}},{key:"componentDidMount",value:function(){this.props.socket.emit(p.a.PUBLIC_CHAT,this.addChat),this.props.socket.on(p.a.PRIVATE_MESSAGE,this.addChat)}},{key:"sameElements",value:function(e,t){return e.every(function(e){return t.includes(e)})&&t.every(function(t){return e.includes(t)})}},{key:"sendPrivateMessage",value:function(e){var t=this,a=[e,this.props.user.nickname],n=this.state.chats.find(function(e){return t.sameElements(e.users,a)});n?this.setActive(n):this.props.socket.emit(p.a.PRIVATE_MESSAGE,this.props.user.nickname,e)}},{key:"render",value:function(){return n.createElement("div",{className:"container"},n.createElement(g,{privateMessage:this.sendPrivateMessage,users:this.state.users,socket:this.props.socket,chats:this.state.chats,user:this.props.user,active:this.state.active,setActive:this.setActive}),n.createElement("div",{className:"chat-room-container"},null!==this.state.active?n.createElement("div",{className:"chat-room"},n.createElement(k,{name:this.state.active.title,messages:this.state.active.messages,user:this.props.user}),n.createElement(O,{sendMessage:this.sendMessage})):n.createElement("div",{className:"chat-room choose"},n.createElement("h3",null,"Pick a chat room."))))}},{key:"setActive",value:function(e){this.setState({active:e})}},{key:"sendMessage",value:function(e){var t=this.state.active.id,a=Object(j.createMessage)(e,this.props.user.nickname);this.props.socket.emit(p.a.MESSAGE_SENT,a,t)}},{key:"addChat",value:function(e){var t=this,a=[].concat(Object(f.a)(this.state.chats),[e]);this.setState({chats:a,active:e});var n=p.a.MESSAGE_RECEIVED+"-"+e.id;this.props.socket.on(n,function(a){return t.messageReceived(a,e.id)})}},{key:"messageReceived",value:function(e,t){var a=this.state.chats.map(function(a){return a.id===t&&a.messages.push(e),a});this.setState({chats:a})}}]),t}(n.Component),S=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={socket:a.initConnection(),user:null},a.connectUser=a.connectUser.bind(Object(m.a)(Object(m.a)(a))),a.disconnectUser=a.disconnectUser.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){this.props.title;return s.a.createElement("div",{className:"container"},this.state.user?s.a.createElement(C,{socket:this.state.socket,user:this.state.user}):s.a.createElement(b,{socket:this.state.socket,connectUser:this.connectUser}))}},{key:"initConnection",value:function(){return v()("/")}},{key:"connectUser",value:function(e){this.state.socket.emit(E.USER_CONNECTED,e),this.setState({user:e})}},{key:"disconnectUser",value:function(){this.state.socket.emit(E.USER_DISCONNECTED),this.setState({user:null})}}]),t}(n.Component),y=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(S,{title:"PWA Chat App"})}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,2,1]]]);
//# sourceMappingURL=main.28e85085.chunk.js.map