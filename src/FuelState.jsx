import {useState, useEffect} from 'react'
function FuelState({fuelPerc}) {
    const [perc, setPerc] = useState(100)
    useEffect(()=> {
        const start = performance.now()
        const current = perc
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / 1000
          if (timeFraction > 1) timeFraction = 1
          const value = Math.round(current-(current-fuelPerc)*timeFraction)
          value>0?value:0;
          
          setPerc(Math.round(value))
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate)
          }})
    },[fuelPerc])
    
    return (
        <svg
            baseProfile="full"
            width="288" height="384" viewBox="0 0 288 384"
            className='fuel'>

                <defs>
                    <mask id="inner">
                        <polygon points="290,382 2,382 2,100 100,2 290,2" fill="#FFF" stroke="#FFF" strokeWidth="3" strokeLinejoin="round"/>
                        <rect x="80" y="50" height="50" width="180" rx="25" ry="25" stroke="#FFF" strokeWidth="3" strokeLinejoin="round"/>
                    </mask>
                </defs>
                <g mask="url(#inner)">
                    <rect x="0" y="0" width="288" height="384" fill="#13CB50" fillOpacity = "0.25"/>
                    <polygon points="290,382 2,382 2,100 100,2 290,2" fillOpacity = "0" stroke="#2FFF00" strokeWidth="3" strokeLinejoin="round"/>
                    <rect className="round" x="80" y="50" height="50" width="180" rx="25" ry="25" fillOpacity = "0" stroke="#2FFF00" strokeWidth="3" strokeLinejoin="round"/>
                    <rect x="80" y="196" height="100" width="130" rx="10" ry="10" fillOpacity="0" stroke="#2FFF00" strokeWidth="3" />
                    <line x1="65" y1="181" x2="35" y2="145" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="65" y1="311" x2="35" y2="347" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="225" y1="311" x2="255" y2="347" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="225" y1="181" x2="255" y2="145" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <text x="145" y="246" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" fill="#2FFF00" fontWeight="bold" fontSize="35">
                        {perc}%
                    </text>
                </g>
        </svg>
    )
}
export default FuelState