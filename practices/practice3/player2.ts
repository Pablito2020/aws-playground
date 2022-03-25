import {Context, EventBridgeEvent,} from 'aws-lambda';
import {Match, playerMove} from './utils'

const PLAYER_NAME = "player2"

const handler = async (event: EventBridgeEvent<string, Match>, _context: Context): Promise<void> => {
    await playerMove(PLAYER_NAME, event)
}

export {handler}
