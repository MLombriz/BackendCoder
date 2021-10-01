const getIndex = (id, productos) => productos.findIndex(product => {
    return product.id === id
})
const getFecha = () => new Date().toLocaleString()
const getNextId = productos => productos.length ? (productos[productos.length - 1].id + 1) : 1

module.exports = {
    getIndex,
    getFecha,
    getNextId
}