const express = require('express');
const mongoose = require('mongoose');

//  Using 'useCreateIndex' to supress deprecation warnings
mongoose.set('useCreateIndex', true);

const app = express();
const PORT = process.env.PORT || 3001;

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//  Mongoose database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bricolage', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

//  Starts up the server
app.listen(PORT, () => console.log(`Connected! 🌍 localhost:${PORT}...`));