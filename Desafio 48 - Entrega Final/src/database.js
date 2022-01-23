const mongoose = require('mongoose')
const { mongodb } = require('./keys')



//Connection
const ConnectionToDataBase = async () => {
    try {
        await mongoose.connect(mongodb.URL, mongodb.advancedOptions)
        console.log('Database is connected')
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
ConnectionToDataBase()


// Functions to check if element exists in DB
// ====================>>>>>>> PRODUCT EXIST? >>>>>>>>========================
async function prodExist(id) {
    try {
        await Product.exists({ _id: id }, (err, doc) => {

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

// ====================>>>>>>> CATEGORY EXIST >>>>>>>>========================

async function catExist(catName) {
    try {
        const query = await Product.find({ category: catName })

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

// ====================>>>>>>>LIST PRODUCTS>>>>>>>>========================
async function read() {
    try {
        const query = await Product.find()
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
// ====================>>>>>>>FIND PRODUCT BY ID>>>>>>>>========================
async function find(id) {
    try {
        if (prodExist(id)) {
            return Product.findById(id)
        } else {

            return false
        }
    }
    catch (err) {
        console.error(err)
    }
}
// ====================>>>>>>>FIND CATEGORY >>>>>>>>========================
async function findCategory(catName) {
    try {
        const exist = await catExist(catName)

        if (exist) {
            return Product.find({ category: catName })
        } else {
            return false
        }
    }

    catch (err) {
        console.error(err)
    }
}

// ====================>>>>>>>SAVE PRODUCT >>>>>>>>========================
async function save(data) {
    try {
        const newProd = new Product(data)
        return await newProd.save()
    } catch (err) {
        console.error(err)
    }
}

// ====================>>>>>>> UPDATE PRODUCT >>>>>>>>========================
async function update(id, data) {
    try {
        const exist = prodExist(id)

        if (exist) {
            await Product.updateOne({ _id: id }, data)
            return await Product.findById(id)
        }
        else {
            return false
        }

    } catch (err) {
        console.error(err)
    }
}

// ====================>>>>>>> DELETE PRODUCT >>>>>>>>========================

async function del(id) {
    try {
        const exist = prodExist(id)

        if (exist) {
            return await Product.findOneAndDelete({ _id: id })
        }
        else {
            return false
        }
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { del, save, update, findCategory, find, read }