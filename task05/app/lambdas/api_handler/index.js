exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const eventId = requestBody.id;
  const eventData = requestBody.data;

  const params = {
    TableName: "Events",
    Item: {
      id: eventId,
      data: eventData,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create event" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
