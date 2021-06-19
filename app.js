//Import Express
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const handlebars = require('express-handlebars')
const apiRoutes = require("./routes/index");
const app = express();
const config = require("./config/config");
// const passport = require('passport');


//cors
app.use(cors());

// require('./config/passport');


try {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
} catch (err) {
    console.log("Error connecting Mongodb");
    console.log(err.message)
}


// Setup  server port
const port = config.port;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
// app.use(passport.initialize());

app.use('/', apiRoutes);
app.use('/docs', express.static(__dirname + '/apidoc/index.html'));

// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running on port " + port);
});


module.exports = app;
