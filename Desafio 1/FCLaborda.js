function UsuarioES5(nombre = 'nombre', apellido = 'apellido', libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
}
// Propiedades prototipo de Usuario ES5
UsuarioES5.prototype.getFullName = function () {
    return console.log(`Mi nombre completo es: ${this.nombre} ${this.apellido}`)
}

UsuarioES5.prototype.addMascota = function (mascota) {
    this.mascotas.push(mascota)
}

UsuarioES5.prototype.getMascotas = function () {
    console.log(`El usuario tiene esta cantidad de Mascotas: ${this.mascotas.length}`)
}
UsuarioES5.prototype.addBook = function (book, autor) {
    this.libros.push({ nombre: book, autor: autor })
}
UsuarioES5.prototype.getBooks = function () {
    let librosName = []
    this.libros.map(({ nombre, autor }) => {
        librosName.push(nombre)
    })
    console.log(librosName)
}


const UserES5 = new UsuarioES5(nombre = 'Juan', apellido = 'Gomez',
    libros = [{ nombre: 'El señor de las moscas', autor: 'William Golding' }, { nombre: 'Fundacion', autor: 'Isaac Asimov' }],
    mascotas = ['perro', 'gato'])

console.log('-----// USER ES5 // -----')
console.log(`User Creado con ES5:`, UserES5)
UserES5.getFullName()
UserES5.getMascotas()
console.log('Agrego la mascota "pajarito" a las mascotas del usuario: ')
UserES5.addMascota('pajarito')
UserES5.getMascotas()
UserES5.getBooks()
console.log('Agrego un libro al listado del usuario:')
UserES5.addBook('Harry Potter', 'J.R.Rowling')
UserES5.getBooks()


// -------- ES6 ------- //

class UsuarioES6 {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`Mi nombre completo es: ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }
    getMascotas() {
        console.log(`El usuario tiene esta cantidad de Mascotas: ${this.mascotas.length}`)
    }
    addBook(book, autor) {
        this.libros.push({ nombre: book, autor: autor })
    }
    getBooks() {
        let librosName = []
        this.libros.map(({ nombre, autor }) => {
            librosName.push(nombre)
        })
        console.log(librosName)
    }
}

const UserES6 = new UsuarioES6(nombre = 'Pedro', apellido = 'Rodriguez',
    libros = [{ nombre: 'El señor de las moscas', autor: 'William Golding' }, { nombre: 'Fundacion', autor: 'Isaac Asimov' }],
    mascotas = ['perro', 'gato'])

console.log('-----// USER ES6 // -----')
console.log(`User Creado con ES6:`, UserES6)
UserES6.getFullName()
UserES6.getMascotas()
console.log('Agrego la mascota "pajarito" a las mascotas del usuario: ')
UserES6.addMascota('pajarito')
UserES6.getMascotas()
UserES6.getBooks()
console.log('Agrego un libro al listado del usuario:')
UserES6.addBook('Harry Potter', 'J.R.Rowling')
UserES6.getBooks()
