const {io} = require('socket.io-client')

let socket = io()
const form = document.querySelector('form')
const input = document.querySelector('input')
const chatBody = document.querySelector('ul')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})
socket.on('incomingMessage', (newMessage) => {
    let messageItem = document.createElement('li')
    messageItem.textContent = newMessage
    chatBody.appendChild(messageItem)
    window.scrollTo(0, document.body.scrollHeight)
})            