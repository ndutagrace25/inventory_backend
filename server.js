const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

const users = require('./routes/api/users');

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport.js')(passport);
// use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));