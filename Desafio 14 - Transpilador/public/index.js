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

function addMensaje() {
    const fecha = new Date().toLocaleString('en-us', { timeZone: 'UTC' })
    let mensaje = {
        mail: document.getElementById('mail').value,
        message: document.getElementById('message').value,
        date: fecha
    };
    socket.emit('new-message', mensaje);
    return false;
};
function cleanInputsProductos() {
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('pictureUrl').value = ''
}
function cleanInputsChat() {
    document.getElementById('message').value = ''
    document.getElementById('mail').value = ''
}
function deleteProd(id) {
    socket.emit('deleteProd', id)
}

function render(data) {
    const html = data.map((elem, index) => {
        return (
            `<div id="${elem.id}" key="${index}">
            <strong style="color: blue;">${elem.mail}</strong>: 
            <em>(${elem.date}) <span style="font-style: italic; color: green;">${elem.message}<span></em> </div>`
        )
    }).join(' ')
    to_renderSMS.innerHTML = html
}

// EVENTOS

createBtn.addEventListener('click', () => {
    addProducto()
    cleanInputsProductos()
})

sendBtn.addEventListener('click', () => {
    addMensaje()
    cleanInputsChat()
})

// Accion de eliminar producto
to_render.addEventListener('click', (e) => {
    if (e.target.id == 'deleteBtn') {
        console.log('Id del Item a Eliminar: ', e.path[2].id) //consigo el id del Item
        const id = e.path[2].id
        deleteProd(id)
    }
})



