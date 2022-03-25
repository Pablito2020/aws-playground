const MINIMUM_RANDOM_NUMBER = 0
const MAXIMUM_RANDOM_NUMBER = 10
const MAXIMUM_VALID_RANDOM_NUMBER = 7

export function playerCanReturnBall(): Boolean {
    const number = getRandomInt(MINIMUM_RANDOM_NUMBER, MAXIMUM_RANDOM_NUMBER)
    console.log(`Random number is: ${number}`)
    return number <= MAXIMUM_VALID_RANDOM_NUMBER
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
