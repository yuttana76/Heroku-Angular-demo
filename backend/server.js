//Install express server
const app = require("./app");
const debug = require("debug")("node-angular");
const express = require('express');
const http = require("http");
const path = require('path');

const port = process.env.PORT || 3009;

app.set("port", port);

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port,function () {
  console.log("Listening on port http://localhost:%s", server.address().port);
})
