// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const path = require("path")
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/sessions")(app);

// default value for title local

app.locals.appTitle = `Movie-Database`;
// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const registro = require('./routes/auth.routes');
app.use('/', registro)

const perfil = require('./routes/profile.routes');
app.use('/', perfil)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
