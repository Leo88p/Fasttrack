import { expect, test } from 'vitest'
import {clientToSvg} from '../src/Transform.js'

test('Client to SVG (0,0) test', () => {
    expect(clientToSvg({x:0,y:0})).toStrictEqual({x:-11,y:11})
  })