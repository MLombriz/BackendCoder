const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    MONGODB: {
        URL: 'mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/Ecommerce?retryWrites=true&w=majority',
        advancedOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    MY_SECRET: 'mysecretSession',
    PORT: process.env.SERVER_PORT || 8080, //|| process.argv[2],
    facebook: {
        id: '941758093363123',
        secret: '1e0567cc9f5a879532c2dcc25ef33db8'
    },
    numCPUs: require('os').cpus().length,
    wrongMsgRoute: { "error": "ruta equivocada" },
    msgs: {
        error: "Something went wrong ====>>>",
        products: {
            read: "You don't have created yet any products in database",
            find: "The product that you're trying to find by id doesn't exist in database.",
            update: "The product that you're trying to update doesn't exist in database",
            delete: "The product that you're trying to  delete doesn't exist in database.",
            category: "The category that you're trying to filter is not available in database."
        },
        users: {
            save: "The email that you're trying to signup is already created in our database, please try again with a different address."
        }
    },
    modoForkOrCluster: process.argv[5] || "FORK"
}