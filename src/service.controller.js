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

async function show(req, res) {
  try {
    const { userId, tableName, id } = req.params;
    const userSettings = await getUserSettings(userId, id, tableName);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function getAll(req, res) {
  try {
    const { userId, tableName } = req.params;
    const userSettings = await getAllUserSettings(userId, tableName);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function create(req, res) {
  const { tableName } = req.params;
  const { userSettingsItem } = req.body;
  try {
    await addUserSettings(
      {
        ...userSettingsItem,
        Key: userSettingsItem.userId,
      },
      tableName
    );
    res.status(201).send("User settings added");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function update(req, res) {
  const { userSettingsItem } = req.body;
  const { userId, tableName } = req.params;
  userSettingsItem.userId = userId;
  try {
    await addUserSettings(userSettingsItem, tableName);
    res.status(201).send("User settings updated");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Error updating user settings. Please try again later.");
  }
}

async function destroy(req, res) {
  const { id, tableName, userId } = req.params;
  try {
    await deleteUserSettings(id, tableName, userId);
    res.status(200).send("User settings deleted");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Error deleting user settings. Please try again later.");
  }
}

export { getAll, show, create, update, destroy };
