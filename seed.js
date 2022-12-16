const { addUserSettings } = require("./dynamo");

const seedData = async () => {
  //get default data from UI or set it up here
  //get userId
  const gloablSettings = [
    {
      userId: "user1@lbx.com",
      theme: "dark",
    },
    {
      userId: "user2@lbx.com",
      theme: "light",
    },
    {
      userId: "user1@lbx.com",
      notifications: "enabled",
    },
    {
      userId: "user2@lbx.com",
      notifications: "disabled",
    },
  ];
  const columns = [
    {
      title: "Property",
      field: "PROPERTY",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Occupant",
      field: "OCCUPANT",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Address",
      field: "STREET_ADDRESS",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "City",
      field: "CITY",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Database",
      field: "DATABASE_ACRONYM",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Database ID",
      field: "DATABASE_ID",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "EDR ID",
      field: "EDR_ID",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Elev",
      field: "ELEVATION",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Dist (mi)",
      field: "DISTANCE_MI",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Comments",
      field: "COMMENTS",
      show: true,
      userId: "user1@lbx.com",
      application_name: "CE",
    },
    {
      title: "Notable",
      field: "NOTABLE",
      show: true,
      userId: "user2@lbx.com",
      application_name: "CE",
    },
    {
      title: "Source",
      field: "SOURCE",
      show: true,
      userId: "user2@lbx.com",
      application_name: "CE",
    },
  ];

  try {
    //batch add columns
    const promises = gloablSettings.map(async (column, i) => {
      addUserSettings({ ...column, id: i + "" }, "GlobalSettings");
    });
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};

// seedData();
