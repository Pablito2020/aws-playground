import {EventBridgeEvent} from "aws-lambda";
import {EventBridge} from "aws-sdk";
import {getRound} from "./RoundGetter";
import {playerCanReturnBall} from "./BallReturner";

export interface Match {
    round: string
}

const LATEST_ROUND = 9

export async function playerMove(player: string, event: EventBridgeEvent<string, Match>) {
    const round = getRound(event.detail.round)
    console.log(`Current round is: ${round}`)
    if (round > LATEST_ROUND)
        console.log(`Error: Rounds are higher than ${LATEST_ROUND}`)
    else if (!playerCanReturnBall()) {
        console.log(`Error: Couldn't return the ball`)
    } else {
        console.log("Returning the ball")
        const data = await sendPlayerEvent(round, player)
        console.log(data)
    }
}

function sendPlayerEvent(round: number, player: string): Promise<EventBridge.PutEventsResponse> {
    const eventBridge = new EventBridge()
    const detail = {round: round.toString()}
    const params = {
        Entries: [
            {
                Source: player.toString(),
                DetailType: "ping-pong-event",
                Detail: JSON.stringify(detail),
                EventBusName: "pablo-fraile-event-bus"
            },
        ]
    }
    return eventBridge.putEvents(params).promise()
}
