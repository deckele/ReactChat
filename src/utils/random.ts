export function getRandomItemFromArray<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUniqueId(identStr: string) {
    const currentDate = new Date().getTime();    
    return `${identStr}:${currentDate}`
}