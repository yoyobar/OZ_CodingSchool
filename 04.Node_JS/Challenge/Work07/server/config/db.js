const mongoose = require('mongoose');

const connectWithDB = () => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.DB_URL)
        .then(console.log(`DB connection`))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};

module.exports = connectWithDB;
