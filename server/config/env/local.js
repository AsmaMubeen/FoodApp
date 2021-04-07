module.exports = {
    port: 3003,
    jwt: {
        secret: "FoodApp2021@vbkfghiurihj",
        options: { expiresIn: 365 * 60 * 60 * 24 } // 365 days
    },
    db: {
        mongo: {
            uri: "mongodb://localhost:27017/foodApp",
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                autoIndex: true,
                user: '',
                pass: '',
                socketTimeoutMS: 0,
                keepAlive: true,
            }
        }
    }
}
