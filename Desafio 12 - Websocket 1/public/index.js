// const fs = require('fs')
const socket = io.connect();
const my_template = document.getElementById('template');
const to_render = document.getElementById('to_render');

socket.on('productos', data => {
    //console.log('Productos Cargados: ', data);
    const template = ejs.compile(my_template.innerHTML);
    to_render.innerHTML = template({ items: data, productsExist: data.length > 0 ? true : false })
})

function addProducto() {
    let item = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        pictureUrl: document.getElementById('pictureUrl').value
    };
    socket.emit('item', item);
    return false;
};
function cleanInputs() {
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('pictureUrl').value = ''
}
function deleteProd(id) {
    socket.emit('deleteProd', id)
}

const createBtn = document.getElementById('createBtn')
createBtn.addEventListener('click', () => {
    addProducto()
    cleanInputs()
})

to_render.addEventListener('click', (e) => {
    if (e.target.id == 'deleteBtn') {
        console.log('Id del Item a Eliminar: ', e.path[2].id) //consigo el id del Item
        const id = e.path[2].id
        deleteProd(id)
    }
})
// deleteBtn.addEventListener('click', (e) => {
    // console.log('Id del Item a Eliminar: ', e.path[2].id) //consigo el id del Item
    // const id = e.path[2].id
    // deleteProd(id)
// })
