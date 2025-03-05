const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const os = require("os");
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.target_table;

exports.handler = async (event) => {
  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      principalId: event.principalId,
      body: event.content,
      createdAt: new Date().toISOString(),
    },
  };
  try {
    console.log("Params: ", JSON.stringify(params));
    const data = await docClient.put(params).promise();
    console.log("DynamoDB Response: ", JSON.stringify(data));
    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Event created successfully",
        event: params.Item,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
