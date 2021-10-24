const mongoose = require('mongoose')
const productSchema = require('./schemas/products')
const userSchema = require('./schemas/user')
const constant = require('../../constants/constants')
// CONECTION
const ConnectionToDataBase = async () => {
    try {
        await mongoose.connect("mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected")
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}

ConnectionToDataBase();

// CRUD
exports.listarProd = async (req, res) => {
    try {
        const allProducts = await productSchema.find()
        res.json({
            quantity: allProducts.length,
            products: allProducts
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.listarProdById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.json({ message: "Need an ID" })
        } else {
            const productSaved = await productSchema.findById(id)
            res.json({ product: productSaved })
        }
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }

}
exports.agregarProd = async (req, res) => {
    if (constant.administrator) {
        const { name, description } = req.body
        if (!name || !description) {
            res.json({ message: "The product needs a name and description" })
        } else {
            try {
                const newProduct = new productSchema(req.body)
                await newProduct.save()
                res.json({ message: "Product Saved" })
            } catch (err) {
                throw new Error(`Error en el servidor ${err}`)
            }
        }
    } else {
        res.send({ error: -1, descripcion: 'Ruta /agregar con método post NO autorizada' });
    }
}
exports.actualizarProd = async (req, res) => {
    if (constant.administrator) {
        try {
            const { id } = req.params
            if (!id) {
                res.json({ message: "Need an ID" })
            } else {
                const newProduct = new productSchema(req.body)
                const updatedProduct = await productSchema.findByIdAndUpdate(id, newProduct, {
                    upsert: true
                },
                    function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(result);
                        }
                    }
                )
                res.json({
                    message: "Product Updated",
                    productUpdated: newProduct
                })
            }
        } catch (err) {
            throw new Error(`Error en el servidor ${err}`)
        }
    }
}
exports.borrarProd = async (req, res) => {
    if (constant.administrator) {
        try {
            const { id } = req.params
            if (!id) {
                res.json({ message: "Need an ID" })
            } else {
                const productToDelete = await productSchema.findOneAndDelete(id)
                res.json({
                    message: `Product ${productToDelete.name} was deleted. Complete info in product.`,
                    product: productToDelete
                })
            }
        } catch (err) {
            throw new Error(`Error en el servidor ${err}`)
        }
    }
}
// FILTROS
exports.prodFiltrarNombre = async (req, res) => {
    try {
        const producto = await productSchema.findOne({ "nombre": req.params.nombre });
        res.send(producto);
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarCodigo = async (req, res) => {
    try {
        const producto = await productSchema.findOne({ "codigo": req.params.codigo });
        res.send(producto);
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarPrecios = async (req, res) => {
    try {
        const productos = await productSchema.find({ "precio": { $gte: req.params.precio1, $lte: req.params.precio2 } });
        res.send(productos);
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarStocks = async (req, res) => {
    try {
        const productos = await productSchema.find({ "stock": { $gte: req.params.stock1, $lte: req.params.stock2 } });
        res.send(productos);
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
// USER
exports.getUserByUsername = async (username, password, done) => {
    await userSchema.findOne({ 'username': username },
        function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                console.log('User Not Found with username: ' + username)
                return done(null, false,
                    console.log('message', 'User Not Found'))
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password')
                return deleteOne(null, false,
                    console.log('message', 'Invalid Password'))
            }
            return done(null, user)
        })
}

// exports.findUser = (req) => {
//     await userSchema.findOne({ 'username': username },
//         function (err, user) {
//             if (err) {
//                 console.log('Error in SignUp: ' + err)
//                 return callback(err)
//             }
//             if (user) {
//                 console.log('User already Exists')
//                 return callback(null, false,
//                     console.log('message', 'User Already Exists'))
//             } else {
//                 let newUser = {
//                     username: username,
//                     password = createHash(password)
//                 }
//                 newUser.save(function (err) {
//                     if (err) {
//                         console.log('Error in Saving user: ' + err)
//                         throw err
//                     }
//                     console.log('User Registration succesful')
//                     return callback(null, newUser)
//                 })
//             }
//         })
// }

const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password)
}
const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

// MENSAJES
const messageSchema = require('./schemas/messages')
const { deleteOne } = require('./schemas/products')

exports.addMessage = async (req, res) => {
    const { mail, message } = req.body
    if (!mail || !message) {
        res.json({ message: "The message needs a mail and message" })
    } else {
        const newMessage = new messageSchema(req.body)
        await newMessage.save()
        res.json({ message: "Message Saved" })
    }
}