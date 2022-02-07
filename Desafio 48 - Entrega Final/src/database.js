const mongoose = require('mongoose')
const { MONGODB } = require('./keys')


//Connection
const ConnectionToDataBase = async () => {
    try {
        await mongoose.connect(MONGODB.URL, MONGODB.advancedOptions)
        console.log('Database is connected')
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
ConnectionToDataBase()


const productSchema = require('./schemas/products.js')
const Cart = require('./schemas/cart')
const Order = require('./schemas/order')
const Message = require('./schemas/message')
const { msgs } = require('./keys')
// FUNCTIONS

////  ------- PRODUCT FUNCTIONS -------- ////
// PRODUCT EXIST?
async function prodExist(id) {
    try {
        await productSchema.exists({ _id: id }, (err, doc) => {
            if (err) {
                console.log("product is not available in db")
                return false
            }
            else {

                console.log("product exist in database")
                return true
            }
        })
    } catch (err) {
        console.error(err)
    }

}
//  CATEGORY EXIST?
async function catExist(catName) {
    try {
        const query = await productSchema.find({ category: catName })
        if (query.length == 0) {
            console.log("Category is not available in db")
            return false
        }
        else {
            console.log("Category exist in database")
            return true
        }

    } catch (err) {
        console.error(err)
    }
}
// Functions to make queries to Mongo database
// LIST PRODUCTS
async function read() {
    try {
        const query = await productSchema.find()
        if (query.length > 0) {
            return query
        } else {
            return false
        }
    }
    catch (err) {
        console.error(err)
    }
}
// FIND PRODUCT BY ID
async function find(id) {
    try {
        if (prodExist(id)) {
            return productSchema.findById(id)
        } else {

            return false
        }
    }
    catch (err) {
        console.error(err)
    }
}
// FIND CATEGORY
async function findCategory(catName) {
    try {
        const exist = await catExist(catName)

        if (exist) {
            return productSchema.find({ category: catName })
        } else {
            return false
        }
    }

    catch (err) {
        console.error(err)
    }
}
// SAVE PRODUCT
async function save(data) {
    try {
        const newProd = new productSchema(data)
        return await newProd.save()
    } catch (err) {
        console.error(err)
    }
}
// UPDATE PRODUCT
async function update(id, data) {
    try {
        const exist = prodExist(id)

        if (exist) {
            await productSchema.updateOne({ _id: id }, data)
            return await productSchema.findById(id)
        }
        else {
            return false
        }

    } catch (err) {
        console.error(err)
    }
}
// DELETE PRODUCT
async function del(id) {
    try {
        const exist = prodExist(id)

        if (exist) {
            return await productSchema.findOneAndDelete({ _id: id })
        }
        else {
            return false
        }
    }
    catch (err) {
        console.error(err)
    }
}
////  ------- END PRODUCT FUNCTIONS -------- ////
//////////////////////////////////////////////
////  ------- CART FUNCTIONS -------- ////
async function readCart(email) {
    try {
        const cart = await Cart.findOne({ email: email })
        if (cart.items.length == 0) {
            return { "msg": "No hay productos disponibles" }
        } else {
            return cart
        }
    }
    catch (err) {
        console.error(err)
    }
}
async function addCart(email) {
    try {
        const cart = {
            "email": email,
            "order": 1,
            "items": [],
            "shippingAdress": ""
        }
        const addCart = new Cart(cart)
        return await addCart.save()


    } catch (err) {
        console.error(err)
    }
}
async function add(idProd, email) {
    try {
        const getCart = await Cart.findOne({ email: email })
        const idCart = getCart._id
        let product = await productSchema.findById(idProd)
        let cart = await Cart.findById(idCart)
        const filterProduct = getCart.items.find(element => element._id == idProd)

        if (filterProduct == undefined) {
            console.log("no existe el producto en el carrito")
            cart.items.push(product)
        } else {
            const indexProd = cart.items.map(function (e) {
                return e._id.toString()
            }).indexOf(idProd)
            cart.items[indexProd].qty += 1
        }
        await Cart.updateOne({ _id: idCart }, cart)
        const cartUpdated = await Cart.findById(idCart)
        return cartUpdated
    }
    catch (err) {
        console.error(msgs.error, err)
    }
}

async function deleteCartItem(email, idProd) {
    const UserCart = await Cart.findOne({ email: email })
    const newUserCart = UserCart.items.filter(function (elem) {
        return elem._id !== idProd
    })
    console.log(newUserCart) //NO ESTA FUNCIONANDO


}
////  ------- END CART FUNCTIONS -------- ////
/////////////////////////////////////////////////////
////  ------- ORDER FUNCTIONS -------- ////
async function makeOrder(email) {
    try {
        const cart = await Cart.findOne({ email: email })
        const newOrder = {
            email: cart.email,
            items: cart.items,
            fromCart: cart._id,
            shippingAddress: cart.shippingAddress,
            status: "Emitted"
        }
        const order = new Order(newOrder)
        cart.items = []
        await Cart.updateOne({ _id: cart._id }, cart)
        return await order.save()

    } catch (err) {
        console.error(err)
    }
}
////  ------- END ORDER FUNCTIONS -------- ////
/////////////////////////////////////////////////
////  ------- MESSAGE FUNCTIONS -------- ////
async function saveMessage(msg) {
    try {
        const newMsg = new Message(msg)
        await newMsg.save()
    } catch (err) {
        console.err(err)
    }
}

async function readMessage() {
    try {
        const msg = await Message.find()
        return msg
    } catch (err) {
        console.err(err)
    }
}

async function filterMessages(email) {
    try {
        return await Message.find({ email: email })
    } catch (err) {
        console.err(err)
    }
}
////  ------- END MESSAGE FUNCTIONS -------- ////

module.exports = {
    del,
    save,
    update,
    findCategory,
    find,
    read,
    readCart,
    addCart,
    add,
    deleteCartItem,
    makeOrder,
    saveMessage,
    readMessage,
    filterMessages
}