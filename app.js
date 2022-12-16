const express = require("express");
const {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
} = require("./dynamo");

const app = express();
app.use(express.json());

app.get("/usersettings/:tableName/:userId/:id", async (req, res, next) => {
  try {
    const { userId, tableName, id } = req.params;
    const userSettings = await getUserSettings(userId, id, tableName);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/usersettings/all/:tableName/:userEmail", async (req, res, next) => {
  try {
    const { userEmail, tableName } = req.params;
    const userSettings = await getAllUserSettings(userEmail, tableName);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/usersettings/:tableName", async (req, res) => {
  const { userSettingsItem, tableName } = req.body;
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
});

app.put("/usersettings/:tableName/:userId", async (req, res) => {
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
});

app.delete("/usersettings/:tableName/:id/:userId", async (req, res) => {
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
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
