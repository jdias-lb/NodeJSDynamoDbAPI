/**
 * GET     /api/service/:tableName/:userId              ->  getAll
 * POST    /api/service/:tableName                      ->  create
 * GET     /api/service/:tableName/:userId/:id          ->  show
 * PUT     /api/service/:tableName/:id                  ->  update
 * DELETE  /api/service/:tableName/:id                  ->  destroy
 */

import {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
} from "./dynamo.js";
import {
  handleEntityNotFound,
  handleError,
  respondWithResult,
} from "./utils.js";

/**
 * @function show
 * @description Function that returns single usersetting by userId, id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
async function show(req, res) {
  const { userId, tableName, id } = req.params;
  return await getUserSettings(userId, id, tableName)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function getAll
 * @description Function that returns all Application specific user settings by userId provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
async function getAll(req, res) {
  const { userId, tableName } = req.params;
  return await getAllUserSettings(userId, tableName)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create usersetting by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
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

/**
 * @function update
 * @description Function that update usersetting by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
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

/**
 * @function destroy
 * @description Function that delete usersetting by userId, id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
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
