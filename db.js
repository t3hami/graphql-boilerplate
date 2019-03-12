const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/graphqldb';

mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => {
        console.log("Database Faild to connect")
    })
    .once('open', () => { 
        console.log("Database Connected!");
    });