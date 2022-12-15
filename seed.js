const { addUserSettings } = require("./dynamo");

const seedData = async () => {
  //get default data from UI or set it up here
  //get userId
  const columns = [
    {
      title: "Property",
      field: "PROPERTY",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Occupant",
      field: "OCCUPANT",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Address",
      field: "STREET_ADDRESS",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "City",
      field: "CITY",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Database",
      field: "DATABASE_ACRONYM",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Database ID",
      field: "DATABASE_ID",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "EDR ID",
      field: "EDR_ID",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Elev",
      field: "ELEVATION",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Dist (mi)",
      field: "DISTANCE_MI",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Comments",
      field: "COMMENTS",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Notable",
      field: "NOTABLE",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
    {
      title: "Source",
      field: "SOURCE",
      show: true,
      userEmailId: "user@lbx.com",
      application_name: "CE",
    },
  ];

  try {
    //batch add columns
    const addColumnPromises = columns.map(async (column, i) => {
      addUserSettings({ ...column, userId: i + "" });
    });
    await Promise.all(addColumnPromises);
  } catch (err) {
    console.log(err);
  }
};

seedData();
