/**
 * GET     /api/service/:tableName/:userId              ->  getAll
 * POST    /api/service/:tableName                      ->  create
 * GET     /api/service/:tableName/:userId/:id          ->  show
 * PUT     /api/service/:tableName/:id                  ->  update
 * DELETE  /api/service/:tableName/:id                  ->  destroy
 */

// Setup Models and import them here
import {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
} from "./database/dynamo.js";
import {
  handleEntityNotFound,
  handleError,
  respondWithResult,
} from "./utils/common.js";

async function show(req, res) {
  const { userId, tableName, id } = req.params;
  return await getUserSettings(userId, id, tableName)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

async function getAll(req, res) {
  const { userId, tableName } = req.params;
  return await getAllUserSettings(userId, tableName)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

async function create(req, res) {
  const { tableName } = req.params;
  const { userSettingsItem } = req.body;
  try {
    await addUserSettings(userSettingsItem, tableName);
    res.status(201).send("User settings added");
  } catch (err) {
    res.status(500).send(err);
  }
}

async function update(req, res) {
  const { userSettingsItem } = req.body;
  const { userId, tableName } = req.params;
  userSettingsItem.userId = userId;
  try {
    await addUserSettings(userSettingsItem, tableName);
    res.status(204).send("User settings updated");
  } catch (err) {
    res.status(500).send(err);
  }
}

async function destroy(req, res) {
  const { id, userId, tableName } = req.params;
  try {
    await deleteUserSettings(id, userId, tableName);
    res.status(200).send("User settings deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export { getAll, show, create, update, destroy };
