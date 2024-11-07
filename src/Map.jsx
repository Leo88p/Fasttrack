import {useEffect, useRef, useState} from 'react';

function Map() {
    const ref = useRef(null)

    const [width, setWidth] = useState(100)
    const [height, setHeight] = useState(100)
    const [offset, setOffset] = useState({
        width:0,
        height:0
    })

    function resize () {
        if(ref.current) {
            setWidth(ref.current.clientWidth)
            setHeight(ref.current.clientHeight)
        }
    }

    function eventKey(event) {
        const step=10
        switch (event.code) {
            case 'ArrowUp': {
                console.log(offset.height - 1)
                setOffset({
                    width: offset.width,
                    height:offset.height-step
                })
                break;
            }
            case 'ArrowDown': {
                setOffset({
                    width: offset.width,
                    height:offset.height+step
                })
                break;
            }
            case 'ArrowLeft': {
                setOffset({
                    width: offset.width-step,
                    height:offset.height
                })
                break;
            }
            case 'ArrowRight': {
                setOffset({
                    width: offset.width+step,
                    height:offset.height
                })
                break;
            }
          }
    }
    useEffect(() => {
        resize()
    })
    useEffect(() => {
        addEventListener('resize', resize)
        addEventListener('keydown', eventKey)

        return() => {
            removeEventListener('resize', resize)
            removeEventListener('keydown', eventKey)
        }
    
    }, [offset]);

    return(
        <div ref={ref}>
            <svg width={width} height={height} viewBox={`${-width/2+offset.width} ${-height/2+offset.height} ${width} ${height}`} fill="#2FFF00">
                <polygon points='-22,20 22,20 0,-20'/>
            </svg>
        </div>
    )
}
export default Map