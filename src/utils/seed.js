import { addUserSettings } from "../database/dynamo.js";

const seedData = async () => {
  //get default data from UI or set it up here
  //get userId
  const gloablSettings = [
    {
      userId: "user1@lbx.com",
      id: "globalsetting1",
      notifications: "disabled",
      theme: "dark",
    },
    {
      userId: "user2@lbx.com",
      id: "globalsetting2",
      notifications: "disabled",
      theme: "light",
    },
    {
      userId: "user1@lbx.com",
      id: "globalsetting3",
      notifications: "enabled",
      theme: "dark",
    },
    {
      userId: "user2@lbx.com",
      id: "globalsetting4",
      notifications: "disabled",
      theme: "dark",
    },
  ];
  const columns = [
    {
      title: "Property",
      field: "PROPERTY",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn1",
      application_name: "CE",
    },
    {
      title: "Occupant",
      field: "OCCUPANT",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn2",
      application_name: "CE",
    },
    {
      title: "Address",
      field: "STREET_ADDRESS",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn3",
      application_name: "CE",
    },
    {
      title: "City",
      field: "CITY",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn4",
      application_name: "CE",
    },
    {
      title: "Database",
      field: "DATABASE_ACRONYM",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn5",
      application_name: "CE",
    },
    {
      title: "Database ID",
      field: "DATABASE_ID",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn6",
      application_name: "CE",
    },
    {
      title: "EDR ID",
      field: "EDR_ID",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn7",
      application_name: "CE",
    },
    {
      title: "Elev",
      field: "ELEVATION",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn8",
      application_name: "CE",
    },
    {
      title: "Dist (mi)",
      field: "DISTANCE_MI",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn9",
      application_name: "CE",
    },
    {
      title: "Comments",
      field: "COMMENTS",
      show: true,
      userId: "user1@lbx.com",
      id: "historicalDataColumn10",
      application_name: "CE",
    },
    {
      title: "Notable",
      field: "NOTABLE",
      show: true,
      userId: "user2@lbx.com",
      id: "historicalDataColumn11",
      application_name: "CE",
    },
    {
      title: "Source",
      field: "SOURCE",
      show: true,
      userId: "user2@lbx.com",
      id: "historicalDataColumn12",
      application_name: "CE",
    },
  ];

  try {
    //batch add columns
    const promises = columns.map(async (column, i) => {
      addUserSettings({ ...column }, "HistoricalResearch");
    });
    Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};

seedData();
