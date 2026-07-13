export function createRange(start: number, end: number) {
    const table = [];

    for(let i = start; i <= end; i++)
        table.push(i);

    return table;
}