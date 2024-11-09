import { expect, test } from 'vitest'
import {clientToSvg, svgToClient, distToFuel} from '../src/Transform.js'

test('Client to SVG (0,0) test', () => {
    expect(clientToSvg({x:0,y:0})).toStrictEqual({x:-11,y:11})
  })

test('SVG to Client (10,10) test', () => {
    expect(svgToClient({x:209,y:-209})).toStrictEqual({x:10,y:10})
  })
  test('Distance to Fuel(100, 100) test', () => {
    expect(distToFuel({x:100,y:100})).toEqual(141)
  })