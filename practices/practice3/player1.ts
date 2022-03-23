import {
    Context,
} from 'aws-lambda';
const handler = async (event: any, context: Context) : Promise<void> => {
    console.log(event)
    console.log(context.functionName)
    console.log('Hello world')
}

export {handler}
