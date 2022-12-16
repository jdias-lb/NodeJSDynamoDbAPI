"use strict";
/**
 * @description Express Framework for Node.js
 */
import express from "express";
const app = express();
app.use(express.json());

/**
 * @description Routes config class
 * @param Routes
 */
import { initRoutes } from "./src/route.conf.js";

/**
 * @description Configure Routes
 */
initRoutes(app);

const port = process.env.PORT || 3000;
/**
 * @function startServer
 * @description Start API Server
 */
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

export default app;
