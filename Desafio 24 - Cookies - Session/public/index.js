const socket = io.connect()
const my_template = document.getElementById('template');
const to_render = document.getElementById('to_render');
const createBtn = document.getElementById('createBtn')
const sendBtn = document.getElementById('sendBtn')
const to_renderSMS = document.getElementById('to_renderSMS')
const compression_percentage = document.getElementById('compression_percentage')
const loginBtn = document.getElementById('loginBtn')
const logoutBtn = document.getElementById('logoutBtn')

const { schema, normalize, denormalize } = normalizr;

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });

const messageSchema = new schema.Entity(
    "messages",
    {
        author: authorSchema,
    },
    {
        idAttribute: "_id",
    }
);
//SOCKET
socket.on('productos', data => {
    const template = ejs.compile(my_template.innerHTML);
    to_render.innerHTML = template({ items: data, productsExist: data.length > 0 ? true : false })
})

socket.on('messages', (data) => {
    console.log(messageSchema)
    const denormalizedData = denormalize(
        data.result
        [messageSchema],
        data.entities
    );
    const compressionPercentage = (
        (JSON.stringify(data).length / JSON.stringify(denormalizedData).length) *
        100
    ).toFixed(2);

    renderMessage(denormalizedData, compressionPercentage);
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

const renderMessage = (data, compression) => {
    let html = data
        .map((message, index) => {
            return `<li key="${index}">
						<p>${message.author.email}</p>
						<p>[${message.updatedAt}]:</p>
						<p>${message.message}</p>
						<img src=${message.author.avatar} alt="">
					</li>`;
        })
        .join(" ");
    to_renderSMS.innerHTML = html;
    compression_percentage.innerHTML = `[compression percentage: ${compression}]`;
}

function newMensaje() {
    const fecha = new Date().toLocaleString('en-us', { timeZone: 'UTC' })
    let message = {
        author: {
            name: document.getElementById("user-name").value,
            lastname: document.getElementById("user-lastname").value,
            birthday: document.getElementById("user-birthday").value,
            alias: document.getElementById("user-alias").value,
            email: document.getElementById("mail").value,
            avatar: document.getElementById("user-avatar").value,
        },
        message: document.getElementById("message").value,
    };
    socket.emit('new-message', message);
    return false;
};
function cleanInputsProductos() {
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('pictureUrl').value = ''
}
function cleanInputsChat() {
    document.getElementById("user-name").value = ''
    document.getElementById("user-lastname").value = ''
    document.getElementById("user-birthday").value = ''
    document.getElementById("user-alias").value = ''
    document.getElementById("mail").value = ''
    document.getElementById("user-avatar").value = ''
    document.getElementById('message').value = ''
}
function deleteProd(id) {
    socket.emit('deleteProd', id)
}

// EVENTOS

createBtn.addEventListener('click', () => {
    addProducto()
    cleanInputsProductos()
})

sendBtn.addEventListener('click', () => {
    newMensaje()
    cleanInputsChat()
})
loginBtn.addEventListener('click', () => {
    const userName = document.getElementById('loginUser').value
    const Bienvenida = document.getElementById('welcomeMessage')
    const inputUserDiv = document.getElementById('inputUserName')
    Bienvenida.innerHTML = `<h2> BIENVENIDO <strong>${userName}</strong>, Gracias por visitar la pagina. Esperemos sea de tu agrado </h2>`
    loginBtn.disabled = true
    loginBtn.hidden = true
    inputUserDiv.hidden = true
    console.log('creando usuario')
    socket.emit('userName', userName)
})

// Accion de eliminar producto
to_render.addEventListener('click', (e) => {
    if (e.target.id == 'deleteBtn') {
        console.log('Id del Item a Eliminar: ', e.path[2].id) //consigo el id del Item
        const id = e.path[2].id
        deleteProd(id)
    }
})

document.addEventListener("DOMContentLoaded", function () {
    let myBtn = document.getElementById("sendBtn");
    let myAlias = document.getElementById("user-alias");
    let logoutButton = document.getElementById('logoutBtn')
    myBtn.disabled = true;

    myAlias.onchange = function () {
        myAlias.value ? (myBtn.disabled = false) : (myBtn.disabled = true);
    };

});