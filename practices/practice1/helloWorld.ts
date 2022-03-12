import {
    Context,
} from 'aws-lambda';
const handler = async (event: any, context: Context) : Promise<void> => {
    // @ts-ignore
    console.log(event)
    // @ts-ignore
    console.log(context.functionName)
    // @ts-ignore
    console.log('Hello world lambda')
}

export {handler}
