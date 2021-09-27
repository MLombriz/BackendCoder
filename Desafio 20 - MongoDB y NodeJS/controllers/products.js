// Importo el Schema de Mongoose
const productSchema = require('../schemas/products')
const addProduct = async (req, res) => {
    const { name, description } = req.body
    if (!name || !description) {
        res.json({ message: "The product needs a name and description" })
    } else {
        const newProduct = new productSchema(req.body)
        await newProduct.save()
        res.json({ message: "Product Saved" })
    }
}
const deleteOneProduct = async (req, res) => {
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

}
const findOneProduct = async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.json({ message: "Need an ID" })
    } else {
        const productSaved = await productSchema.findById(id)
        res.json({ product: productSaved })
    }

}
const updateOneProduct = async (req, res) => {
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
}
const listAllProducts = async (req, res) => {
    const allProducts = await productSchema.find()
    res.json({
        quantity: allProducts.length,
        products: allProducts
    })
}


module.exports = { deleteOneProduct, findOneProduct, addProduct, updateOneProduct, listAllProducts }