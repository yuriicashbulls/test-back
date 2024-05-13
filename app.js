const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require('cors');



const app = express();
const router = require('./app/router/index');



app.use(cors());
// app.enable("trust proxy");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(express.static(path.join(__dirname, "public")));

router.API(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

module.exports = app;
