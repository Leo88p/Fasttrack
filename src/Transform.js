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

export function healthToAngle(health) {
    return ({
        x: 189*Math.round(Math.sin(health*Math.PI/180)*10000)/10000,
        y: 192+189*Math.round(Math.cos(health*Math.PI/180)*100000)/100000
    })
}