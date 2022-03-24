import {Context, EventBridgeEvent,} from 'aws-lambda';
import {EventBridge} from "aws-sdk";

interface Match {
    round: string
}

const LATEST_ROUND = 9

const handler = async (event: EventBridgeEvent<string, Match>, _context: Context): Promise<void> => {
    const round = getRound(event)
    console.log(`Current round is: ${round}`)
    if (round > LATEST_ROUND)
        console.log(`Error: Rounds are higher than ${LATEST_ROUND}`)
    else if (!playerCanReturnBall()) {
        console.log(`Error: Couldn't return the ball`)
    } else {
        console.log("Returning the ball")
        const data = await sendPlayerEvent(round)
        console.log(data)
    }
}

function getRound(event: EventBridgeEvent<string, Match>): number {
    const round = event.detail.round
    const roundNumber: number = Number(round)
    if (isNaN(roundNumber))
        return 1
    else
        return roundNumber + 1
}

function playerCanReturnBall(): Boolean {
    const number = getRandomInt(0, 10)
    console.log(`Random number is: ${number}`)
    return number <= 7
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendPlayerEvent(round: number): Promise<EventBridge.PutEventsResponse> {
    const eventBridge = new EventBridge()
    const detail = {round: round.toString()}
    const params = {
        Entries: [{
            Source: "player1",
            Detail: JSON.stringify(detail),
            DetailType: "ping-pong-event",
        },]
    }
    return eventBridge.putEvents(params).promise()
}

export {handler}
