const express = require("express");
const {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
} = require("./dynamo");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/usersettings/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userSettings = await getUserSettings(userId);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/usersettings/all/:userEmail", async (req, res, next) => {
  try {
    const { userEmail } = req.params;
    const userSettings = await getAllUserSettings(userEmail);
    res.json(userSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/usersettings", async (req, res) => {
  const { userSettingsItem } = req.body;
  try {
    await addUserSettings({
      ...userSettingsItem,
      Key: userSettingsItem.userId,
    });
    res.status(201).send("User settings added");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.put("/usersettings/:userId", async (req, res) => {
  const { userSettingsItem } = req.body;
  const { userId } = req.params;
  userSettingsItem.userId = userId;
  try {
    await addUserSettings(userSettingsItem);
    res.status(201).send("User settings updated");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Error updating user settings. Please try again later.");
  }
});

app.delete("/usersettings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserSettings(id);
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
