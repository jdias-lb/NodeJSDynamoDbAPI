"use strict";
/**
 * @description Express Framework for Node.js
 * @param Router
 */
const express = require("express");
const app = express();
app.use(express.json());

/**
 * @description User settings Service route Controller
 * @param ServiceController
 */
const {
  getAll,
  show,
  create,
  update,
  destroy,
} = require("./service.controller");

//Routes
app.get("/:tableName/:userId/:id", show);
app.get("/:tableName/:userId", getAll);
app.post("/:tableName", create);
app.put("/:tableName/:userId", update);
app.delete("/:tableName/:id/:userId", destroy);

//TODP: Server refactor to different file
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
