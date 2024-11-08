import {useEffect, useRef, useState} from 'react';
import Ship from './assets/Ship.svg?react'
import Destination from './assets/Destination.svg?react'
import { clientToSvg, svgToClient } from './Transform';

function Map() {
    const ref = useRef(null)

    const [width, setWidth] = useState(100)
    const [height, setHeight] = useState(100)
    const [offset, setOffset] = useState({
        width:0,
        height:0
    })
    const [clicked, setClicked] = useState(false)
    const [moving, setMoving] = useState(false)
    const [cursor, setCursor] = useState({
        x: 0,
        y: 0
    })
    const [clientDest, setClientDest] = useState({
        x: 10,
        y: 10
    })

    const [svgDest, setSvgDest] = useState({
        x: 0,
        y: 0
    })


    function resize () {
        if(ref.current) {
            setWidth(ref.current.clientWidth)
            setHeight(ref.current.clientHeight)
        }
    }

    function eventKeyDown(event) {
        const step=10
        switch (event.code) {
            case 'ArrowUp': {
                setOffset({
                    width: offset.width,
                    height:offset.height-step
                })
                ref.current.classList.add('selectedMap')
                break;
            }
            case 'ArrowDown': {
                setOffset({
                    width: offset.width,
                    height:offset.height+step
                })
                ref.current.classList.add('selectedMap')
                break;
            }
            case 'ArrowLeft': {
                setOffset({
                    width: offset.width-step,
                    height:offset.height
                })
                ref.current.classList.add('selectedMap')
                break;
            }
            case 'ArrowRight': {
                setOffset({
                    width: offset.width+step,
                    height:offset.height
                })
                ref.current.classList.add('selectedMap')
                break;
            }
          }
    }

    function eventKeyUp(event) {
        ref.current.classList.remove('selectedMap')
    }

    function eventPointerDown(event) {
        ref.current.classList.add('selectedMap')
        setClicked(true)
        setCursor({
            x: event.clientX,
            y: event.clientY
        })
    }
    function eventPointerMove(event) {
        if (clicked) {
            if (!moving) {
                ref.current.classList.add('draggingMap')
            }
            setMoving(true)
            setOffset({
                width: offset.width-cursor.x+event.clientX,
                height: offset.height-cursor.y+event.clientY
            })
            setCursor({
                x: event.clientX,
                y: event.clientY
            })
        }
    }
    function eventPointerUp(event) {
        ref.current.classList.remove('selectedMap')
        ref.current.classList.remove('draggingMap')
        if (!moving) {
            const dX = event.clientX - ref.current.offsetLeft - ref.current.clientWidth/2 + offset.width
            const dY = event.clientY - ref.current.offsetTop - ref.current.clientHeight/2 + offset.height
            console.log(svgToClient({x:dX, y:dY}))
            setSvgDest(clientToSvg(svgToClient({x:dX, y:dY})))
        }
        setClicked(false)
        setMoving(false)
    }


    useEffect(() => {
        resize()
    }, [width, height])
    
    useEffect(() => {
        addEventListener('resize', resize)
        addEventListener('keydown', eventKeyDown)
        addEventListener('keyup', eventKeyUp)
        if (ref.current) {
            ref.current.addEventListener('pointerdown', eventPointerDown)
            ref.current.addEventListener('pointermove', eventPointerMove)
            ref.current.addEventListener('pointerup', eventPointerUp)
        }
        return() => {
            removeEventListener('resize', resize)
            removeEventListener('keydown', eventKeyDown)
            removeEventListener('keyup', eventKeyUp)
            if (ref.current) {
                ref.current.removeEventListener('pointerdown', eventPointerDown)
                ref.current.removeEventListener('pointermove', eventPointerMove)
                ref.current.removeEventListener('pointerup', eventPointerUp)
            }
        }
    
    }, [offset, clicked, moving, cursor, svgDest]);

    useEffect(() => {
        setSvgDest(clientToSvg(clientDest))
    }, [clientDest])

    return(
        <div ref={ref}>
            <svg width={width} height={height} viewBox={`${-width/2+offset.width} ${-height/2+offset.height} ${width} ${height}`} fill="#2FFF00">
                <Ship x='-11' y ='11'/>
                <Destination x={svgDest.x} y ={svgDest.y}/>
            </svg>
        </div>
    )
}
export default Map