const EventEmitter = require('events');

const emitter = new EventEmitter();

function sendMessage(username, message, emitter) {
  emitter.emit('message', username, message);
}

emitter.on('message', (username, message) => {
  console.log(`${username}: ${message}`);
});

sendMessage('Lisa', 'Привет!', emitter);
sendMessage('Anna', 'Как дела?', emitter);
sendMessage('Max', 'Всем привет!', emitter);