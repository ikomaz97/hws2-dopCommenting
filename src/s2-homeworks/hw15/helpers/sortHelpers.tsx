export const pureChange = (
    sort: string,
    down: string,
    up: string
) => {
    switch (sort) {
        case down:
            return up
        case up:
            return ''
        default:
            return down
    }
}