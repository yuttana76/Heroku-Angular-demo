const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));
app.use("/images",express.static(path.join("backend/images")));

const ledRoutes = require('./routes/led');
const streamRoutes = require('./routes/stream');

/*
Config for separate Banckend and Frontend servers
*/
app.use((req, res, next) => {
  res.setHeader(
      "Access-Control-Allow-Origin",
      "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT,  DELETE, OPTIONS"
  );
  next();
});

app.use("/api/public",ledRoutes);
app.use("/api/public",streamRoutes);
app.use("/api/public",streamRoutes);


module.exports = app;
