import { DynamoDB } from "aws-sdk";

const handler = async (event: any, _context: any) => {
    // Already configured by AWS
    const client = new DynamoDB.DocumentClient()
    var params = {
        // Insertam el que vagis a ficar dintre de l'item dins d'aquesta taula
        TableName: "pablo-fraile-dynamodb-table",
        Item: {
            // Tres punts -> ens permet no haver de fer per cada un dels events.data
            // Desmonta'm el objecte data i desmonta'l aqui
            // id: 1
            // data: {
            //     key1: value1
            //     key2: value2
            // }
            id: event.id, ...event.data
        }
    }
    await client.put(params).promise()
}

export {handler}
