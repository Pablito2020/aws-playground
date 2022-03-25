const FIRST_ROUND = 1

export function getRound(round: string): number {
    const roundNumber: number = Number(round)
    if (isNaN(roundNumber))
        return FIRST_ROUND
    else
        return roundNumber + 1
}

