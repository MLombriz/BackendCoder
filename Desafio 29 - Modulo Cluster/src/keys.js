module.exports = {
    mongodb: {
        URL: 'mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/Ecommerce?retryWrites=true&w=majority',
        advancedOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    secret: 'mysecretSession',
    PORT: 8080,
    facebook: {
        id: '941758093363123',
        secret: '1e0567cc9f5a879532c2dcc25ef33db8'
    },
    numCPUs: require('os').cpus().length
}