import {EventBridgeEvent} from "aws-lambda";
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
import {getRound} from "./RoundGetter";
import {playerCanReturnBall} from "./BallReturner";

export interface Match {
    round: string
}

const LATEST_ROUND = 9

export async function playerMove(player: string, event: EventBridgeEvent<string, Match>) {
    const round = getRound(event.detail.round)
    console.log(`Current round is: ${round}`)
    if (round > LATEST_ROUND) {
        const segment = AWSXRay.getSegment();
        const subsegment = segment.addNewSubsegment('roundIsOutOfRange');
        subsegment.close();
        console.log(`Error: Rounds are higher than ${LATEST_ROUND}`)
    } else if (!playerCanReturnBall()) {
        const segment = AWSXRay.getSegment();
        const subsegment = segment.addNewSubsegment('playerCanNotReturnBall');
        subsegment.close();
        console.log(`Error: Couldn't return the ball`)
    } else {
        console.log("Returning the ball")
        const segment = AWSXRay.getSegment();
        const subsegment = segment.addNewSubsegment('putEventInEventBridge');
        subsegment.addAnnotation("round", round);
        subsegment.addAnnotation("player", player);
        const data = await sendPlayerEvent(round, player)
        subsegment.close();
        console.log(data)
    }
}

function sendPlayerEvent(round: number, player: string): Promise<AWS.EventBridge.PutEventsResponse> {
    const eventBridge = new AWS.EventBridge()
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
