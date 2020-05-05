const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Ensble CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT,PATCH"
    );
    next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

const users = require('./routes/api/users');
const suppliers = require('./routes/api/suppliers');

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport.js')(passport);
// use routes
app.use('/api/users', users);
app.use('/api/suppliers', suppliers);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));