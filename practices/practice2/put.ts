import { DynamoDB } from "aws-sdk";
import { Context } from "aws-lambda";

interface PutRequest {
  id: string;
  data: any;
}

const handler = async (event: PutRequest, _context: Context) => {
  const client = new DynamoDB.DocumentClient();
  const params = {
    TableName: "pablo-fraile-dynamodb-table",
    Item: {
      id: event.id,
      ...event.data,
    },
  };
  await client.put(params).promise();
};

export { handler };
