import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient(); //new AWS.DynamoDB({apiVersion: '2012-08-10'});
// const TABLE_NAME = process.env.TABLE_NAME;

const getUserSettings = async (userId, id, tableName) => {
  const params = {
    TableName: tableName,
    Key: {
      userId,
      id,
    },
  };
  const { Item } = await dynamoClient.get(params).promise();
  console.log(Item);
  return Item;
};

const getAllUserSettings = async (userId, tableName) => {
  const params = {
    TableName: tableName,
    FilterExpression: "#userId = :userId",
    ExpressionAttributeNames: { "#userId": "userId" },
    ExpressionAttributeValues: { ":userId": userId },
    ReturnConsumedCapacity: "TOTAL",
  };

  const Item = await dynamoClient.scan(params).promise();
  console.log(Item);
  return Item;
};

const addUserSettings = async (userSettingItem, tableName) => {
  const params = {
    TableName: tableName,
    Item: userSettingItem,
  };
  return await dynamoClient.put(params).promise();
};

const deleteUserSettings = async (id, tableName, userId) => {
  const params = {
    TableName: tableName,
    Key: {
      id,
      userId,
    },
  };
  return await dynamoClient.delete(params).promise();
};

// addUserSettings("123", "");
// getUserSettings("1");
// deleteUserSettings("123");
// getAllUserSettings("lbx");

export {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
};
