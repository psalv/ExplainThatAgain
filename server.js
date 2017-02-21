var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;

var app = express();
app.configurable(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

mongoose.connect('mongodb://localhost/restful');

var Product