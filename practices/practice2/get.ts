import {DynamoDB} from "aws-sdk";
import {Context} from "aws-lambda";
import {AttributeMap} from "aws-sdk/clients/dynamodb";

interface GetRequest {
    id: string;
}

const handler = async (event: GetRequest, _context: Context): Promise<AttributeMap | undefined> => {
    const client = new DynamoDB.DocumentClient();
    const params = {
        TableName: "pablo-fraile-dynamodb-table",
        Key: {
            "id": event.id
        },
    };
    const data = await client.get(params).promise()
    return data.Item
};

export { handler };
