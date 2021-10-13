const socket = io.connect()
const my_template = document.getElementById('template');
const to_render = document.getElementById('to_render');
const createBtn = document.getElementById('createBtn')
const sendBtn = document.getElementById('sendBtn')
const to_renderSMS = document.getElementById('to_renderSMS')


//SOCKET
socket.on('productos', data => {
    const template = ejs.compile(my_template.innerHTML);
    to_render.innerHTML = template({ items: data, productsExist: data.length > 0 ? true : false })
})

socket.on('chat', data => {
    render(data)
})

// FUNCIONES JS

function addProducto() {
    let item = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        pictureUrl: document.getElementById('pictureUrl').value
    };
    socket.emit('item', item);
    return false;
};
