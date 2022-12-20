import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getUserSettings = async (userId, id, tableName) => {
  const params = {
    TableName: tableName,
    Key: {
      userId,
      id,
    },
  };
  const { Item } = await dynamoClient.get(params).promise();
  return Item;
};

const getAllUserSettings = async (userId, tableName) => {
  const params = {
    TableName: tableName,
    ExpressionAttributeNames: { "#userId": "userId" },
    ExpressionAttributeValues: { ":userId": userId },
    KeyConditionExpression: "#userId = :userId",
  };

  /* Our schema sets userId as Key and id as SortKey, to partition the data in a way that its most read friendly
  To perform dynamoClient.get we have to provide both key and sort key which by nature prevents getting multiple items.
  Alternatively using scan and filtering table by userId is inefficent and performs scan on all table items.
  Using query we can get all items just by userId (and omit sort key) while only scanning the required items. */
  const Item = await dynamoClient.query(params).promise();
  return Item;
};

const addUserSettings = async (userSettingItem, tableName) => {
  const params = {
    TableName: tableName,
    Item: userSettingItem,
  };
  return await dynamoClient.put(params).promise();
};

const deleteUserSettings = async (id, userId, tableName) => {
  const params = {
    TableName: tableName,
    Key: {
      id,
      userId,
    },
  };
  return await dynamoClient.delete(params).promise();
};

export {
  getUserSettings,
  addUserSettings,
  deleteUserSettings,
  getAllUserSettings,
};
