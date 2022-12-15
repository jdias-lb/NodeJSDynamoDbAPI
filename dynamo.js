const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient(); //new AWS.DynamoDB({apiVersion: '2012-08-10'});
const TABLE_NAME = process.env.TABLE_NAME;

const getUserSettings = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId,
    },
  };
  const { Item } = await dynamoClient.get(params).promise();
  console.log(Item);
  return Item;
};

const getAllUserSettings = async (userEmail) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "#userEmailId = :userEmailId",
    ExpressionAttributeNames: { "#userEmailId": "userEmailId" },
    ExpressionAttributeValues: { ":userEmailId": userEmail },
    ReturnConsumedCapacity: "TOTAL",
  };

  const Item = await dynamoClient.scan(params).promise();
  console.log(Item);
  return Item;
};

const addUserSettings = async (userSettingItem) => {
  const params = {
    TableName: TABLE_NAME,
    Item: userSettingItem,
  };
  return await dynamoClient.put(params).promise();
};

const deleteUserSettings = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId,
    },
  };
  return await dynamoClient.delete(params).promise();
};

// addUserSettings("123", "");
// getUserSettings("1");
// deleteUserSettings("123");
// getAllUserSettings("lbx");

module.exports = {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
};
