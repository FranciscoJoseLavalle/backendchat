let user;
const chatBox = document.querySelector('#chatBox');

const socket = io({
    autoConnect: false
});
Swal.fire({
    title: "Introduce tu usuario",
    input: "text",
    text: "Ingresa el usuario con el que te identificarás en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas identificarte para poder continuar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.connect();
})

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value })
            chatBox.value = "";
        }
    }
})

socket.on('log', data => {
    const log = document.querySelector('#log');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br>`
    })
    log.innerHTML = messages;
})
socket.on('newUser', data => {
    console.log(data);
    if (user) {
        Swal.fire({
            text:"Nuevo usuario en el chat",
            toast:true,
            position:"top-right"
        })
    }
})