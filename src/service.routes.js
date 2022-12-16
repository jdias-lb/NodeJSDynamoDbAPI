/**
 * @description Express Framework Router
 * @param Router
 */
import { Router } from "express";

/**
 * @description User settings Service Controller
 * @param ServiceController
 */
import * as ServiceController from "./service.controller.js";

let router = new Router();

router.get("/:tableName/:userId/:id", ServiceController.show);
router.get("/:tableName/:userId", ServiceController.getAll);
router.post("/:tableName", ServiceController.create);
router.put("/:tableName/:userId", ServiceController.update);
router.delete("/:tableName/:id/:userId", ServiceController.destroy);

export default router;
