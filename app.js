"use strict";
/**
 * @description Express Framework for Node.js
 * @param Router
 */
const express = require("express");
const app = express();
app.use(express.json());

/**
 * @description User settings Service Controller
 * @param ServiceController
 */
const ServiceController = require("./service.controller");

//Routes
app.get("/:tableName/:userId/:id", ServiceController.show);
app.get("/:tableName/:userId", ServiceController.getAll);
app.post("/:tableName", ServiceController.create);
app.put("/:tableName/:userId", ServiceController.update);
app.delete("/:tableName/:id/:userId", ServiceController.destroy);

//TODP: Server refactor to different file
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
