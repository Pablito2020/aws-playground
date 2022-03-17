import { DynamoDB } from "aws-sdk";
import { Context } from "aws-lambda";

interface DeleteRequest {
    id: string;
}

const handler = async (event: DeleteRequest, _context: Context) => {
    const client = new DynamoDB.DocumentClient();
    const params = {
        TableName: "pablo-fraile-dynamodb-table",
        Key: {
            "id": event.id
        },
    };
    await client.delete(params).promise();
};

export { handler };
