export function getRandomItemFromArray(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}