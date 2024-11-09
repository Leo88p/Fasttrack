import {useEffect, useRef, useState} from 'react';
import Ship from './assets/Ship.svg?react'
import Destination from './assets/Destination.svg?react'
import Ally from './assets/Ally.svg?react'
import Asteroid from './assets/Asteroid.svg?react'
import Barrel from './assets/Barrel.svg?react'
import { clientToSvg, svgToClient } from './Transform';

function Map({clientDest, setClientDest, ship, objects}) {
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

    const [svgDest, setSvgDest] = useState({
        x: 0,
        y: 0
    })

    const [svgShip, setSvgShip] = useState({
        x: 0,
        y: 0
    })

    const[objectList, setObjectList] = useState([])


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
            setClientDest(svgToClient({x:dX, y:dY}))
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
    
    }, [offset, clicked, moving, cursor]);

    useEffect(() => {
        setSvgDest(clientToSvg(clientDest))
    }, [clientDest])

    useEffect(() => {
        setSvgShip(clientToSvg(ship))
    }, [ship])

    useEffect(()=> {
        setObjectList(objects.map(obj => {
            const coord = clientToSvg({x: obj.x, y: obj.y})
            if (obj.type=='spaceship') {
                return <>
                <Ally key={'Spaceship '+obj.name+' (x: '+coord.x+', y: '+coord.y + ')'} x={coord.x} y={coord.y}/>
                 <text className='map-label' x={coord.x+22} y ={coord.y+44} fontFamily="Arial, Helvetica, sans-serif" fill="#00DDFF" fontWeight="bold" fontSize="14">
                 {'Spaceship '+obj.name+' (x: '+coord.x+', y: '+coord.y + ')'}
                 </text>
                </>  
            }
            else if (obj.type=='asteroid') {
                return <>
                <Asteroid key={obj.name+' (x: '+coord.x+', y: '+coord.y + ')'} x={coord.x} y={coord.y}/>
                <text className='map-label' x={coord.x+22} y ={coord.y+44} fontFamily="Arial, Helvetica, sans-serif" fill="#00DDFF" fontWeight="bold" fontSize="14">
                {obj.name+' (x: '+coord.x+', y: '+coord.y + ')'}
                </text>
                </>
            }
            else if (obj.type=='fuel_barrel') {
                return <>
                <Barrel key={obj.name+' (x: '+coord.x+', y: '+coord.y + ')'} x={coord.x} y={coord.y}></Barrel>
                <text className='map-label' x={coord.x+22} y ={coord.y+44} fontFamily="Arial, Helvetica, sans-serif" fill="#00DDFF" fontWeight="bold" fontSize="14">
                {obj.name+' (x: '+coord.x+', y: '+coord.y + ')'}
                </text>
                </>
            }
        }))
    }, [objects])
    return(
        <div ref={ref}>
            <svg key={objectList.id} width={width} height={height} viewBox={`${-width/2+offset.width} ${-height/2+offset.height} ${width} ${height}`}>
                {objectList}
                <Ship x={svgShip.x} y ={svgShip.y}/>
                <text className='map-label' x={svgShip.x+22} y ={svgShip.y+44} fontFamily="Arial, Helvetica, sans-serif" fill="#00DDFF" fontWeight="bold" fontSize="14">
                    You
                </text>
                <Destination x={svgDest.x} y ={svgDest.y}/>
            </svg>
        </div>
    )
}
export default Map