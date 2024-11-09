export function clientToSvg(client) {
    return ({
        x:client.x*22-11,
        y:-client.y*22+11
    })
}

export function svgToClient(svg) {
    return ({
        x:Math.floor((svg.x+11)/22),
        y:Math.ceil(-(svg.y-11)/22)
    })
}

export function distToFuel(dist) {
    return Math.round(Math.sqrt(dist.x**2+dist.y**2))
}