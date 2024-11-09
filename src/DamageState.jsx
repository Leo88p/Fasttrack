import {useState, useEffect} from 'react'
import { healthToAngle } from './Transform';
function DamageState({health}) {
    const [point, setPoint] = useState({x:0, y:3})
    const [cHealth, setCHealth] = useState(180)
   useEffect(()=> {
        const start = performance.now()
        const current = cHealth
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / 1000
          if (timeFraction > 1) {
            timeFraction = 1
            }
          const value = current-(current-health)*timeFraction
          const obj = healthToAngle(value)
          setPoint(obj)
          setCHealth(value)
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate) 
          }
        })
    },[health])
    return (
        <svg
            baseProfile="full"
            width="192" height="384" viewBox="0 0 192 384"
            className="damage-bar">

            <path d={`M ${point.x} ${point.y} A 189 189 0 0 1 0 381 L 0 192 Z`} fill="#13CB50" fillOpacity = "0.25"/>
            <circle cx="0" cy="192" r="189" stroke="#2FFF00" fillOpacity = "0" strokeWidth="3"/>
            <path d="M 6 8 L 6 78 M 184 192 L 114 192 M 6 376 L 6 306" stroke="#2FFF00" strokeWidth="12" strokeLinecap="round"/>
            <path d="M 6 4 L 6 30 M 188 192 L 160 192 M 6 380 L 6 336" stroke="#2FFF00" strokeWidth="12"/>
            <path d="M 93 31 L 68 73 M 161 99 L 118 123 M 161 285 L 118 260 M 93 353 L 68 310" stroke="#2FFF00" strokeWidth="8" strokeLinecap="round"/>
        </svg>
    )
}
export default DamageState