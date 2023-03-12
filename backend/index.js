require('dotenv').config();

const mongoose = require('mongoose');
const server = require('./server');

const port = process.env.PORT || 8080;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Mongoose connection opened successfully');
    server.listen(port, () => console.log(`API server started on ${port}`));
});
