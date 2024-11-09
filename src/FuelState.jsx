function FuelState({fuelPerc}) {
    return (
        <svg
            baseProfile="full"
            width="288" height="384" viewBox="0 0 288 384"
            className='fuel'>

                <defs>
                    <mask id="inner">
                        <polygon points="290,382 2,382 2,100 100,2 290,2" fill="#FFF" stroke="#FFF" strokeWidth="3" strokeLinejoin="round"/>
                        <rect x="80" y="50" height="50" width="180" rx="25" ry="25" stroke="#2FFF00" strokeWidth="3" strokeLinejoin="round"/>
                    </mask>
                </defs>
                <g mask="url(#inner)">
                    <rect x="0" y="0" width="288" height="384" fill="#13CB50" fillOpacity = "0.25"/>
                    <polygon points="290,382 2,382 2,100 100,2 290,2" fillOpacity = "0" stroke="#2FFF00" strokeWidth="3" strokeLinejoin="round"/>
                    <rect x="80" y="50" height="50" width="180" rx="25" ry="25" fillOpacity = "0" stroke="#2FFF00" strokeWidth="3" strokeLinejoin="round"/>
                    <rect x="80" y="196" height="100" width="130" rx="10" ry="10" fillOpacity="0" stroke="#2FFF00" strokeWidth="6" />
                    <line x1="65" y1="181" x2="35" y2="145" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="65" y1="311" x2="35" y2="347" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="225" y1="311" x2="255" y2="347" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="225" y1="181" x2="255" y2="145" stroke="#2FFF00" strokeWidth="6" strokeLinecap="round"/>
                    <text x="145" y="246" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" fill="#2FFF00" fontWeight="bold" fontSize="35">
                        {fuelPerc}%
                    </text>
                </g>
        </svg>
    )
}
export default FuelState