import { DynamoDB } from "aws-sdk";
import { Context } from "aws-lambda";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";

interface GetRequest {
    id: string;
}

const handler = async (event: GetRequest, _context: Context): Promise<GetItemOutput> => {
    const client = new DynamoDB.DocumentClient();
    const params = {
        TableName: "pablo-fraile-dynamodb-table",
        Key: {
            "id": event.id
        },
    };
    const data = await client.get(params).promise()
    return data
};

export { handler };
