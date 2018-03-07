const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restApiMongoose');

const app = express();
app.use(helmet()); //security

// Routes
const users = require('./routes/users');
const cars = require('./routes/cars');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', users);
app.use('/cars', cars);




// Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
} );

// Error handler function
app.use((req, res, next) => 
{
    const error = app.get('env') == 'development' ? err : {};
    const status = err.status || 500;
    // respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // respond to ourselves
    console.error(err);
});
// Start the server

const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));