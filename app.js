const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const app = express();

//body parsing
app.use(morgan('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

//using headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept, Authorization"
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
});

//error when no method is found
app.use((req, res, next) =>{
    const error = new Error('not found');
    error.status(404);
    next(error)
});


//base error 
app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        message: error.message  
    })
})

module.exports = app;