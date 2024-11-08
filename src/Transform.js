export function clientToSvg(client) {
    return ({
        x:client.x*10-11,
        y:-client.y*10+11
    })
}