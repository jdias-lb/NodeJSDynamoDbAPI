"use strict";
/**
 * @description Express Framework for Node.js
 * @param Router
 */
import express from "express";
const app = express();
app.use(express.json());

/**
 * @description User settings Service Controller
 * @param ServiceController
 */
import * as ServiceController from "./service.controller.js";
// const ServiceController = require("./service.controller");

//Routes
app.get("/:tableName/:userId/:id", ServiceController.show);
app.get("/:tableName/:userId", ServiceController.getAll);
app.post("/:tableName", ServiceController.create);
app.put("/:tableName/:userId", ServiceController.update);
app.delete("/:tableName/:id/:userId", ServiceController.destroy);

export default app;
