import {useState, useEffect} from 'react'
import Signal from './Signal.jsx'
import DamageState from './DamageState.jsx'
import FuelState from './FuelState.jsx'
import InfoBox from './InfoBox.jsx'
import Map from './Map.jsx'
import serverRequest from './Request.js'
import './App.css'

function App() {
  const [dest, setDest] = useState({
    x: 5,
    y: 5
  })
  const [ship, setShip] = useState({
    x: 0,
    y: 0
  })
  const [connection, setConnection] = useState(true)
  const [objects, setObjects] = useState([])
  const [fuelStore, setFuelStore] = useState(500)
  const [fuelPerc, setFuelPerc] = useState(100)

  function toggleConnection(data) {
    if (!data) {
      document.getElementById('root').style.setProperty('--signal-color', '#FF2F00')
      document.getElementById('root').style.setProperty('--signal-border-color', 'rgba(255, 47, 0, .25)')
    }
    else {
      document.getElementById('root').style.setProperty('--signal-color', '#2FFF00')
      document.getElementById('root').style.setProperty('--signal-border-color', 'rgba(47, 255, 0, .25)')
    }
    setConnection(data)
  }

  function handleFuel(data) {
    let diff = fuelStore-data  
    if (diff<0)
      diff=0
    setFuelStore(diff)
    setFuelPerc(Math.round(fuelPerc-data/5))
    document.getElementById('root').style.setProperty('--fuel-level', 384-384/500*diff)
    console.log(diff)
    document.getElementById('root').style.setProperty('--fuel-color', `rgba(${47+(diff>=250?208/250*(500-diff):208)}, ${47+(diff>=250?208:208/250*diff)}, 0, 1`)
    document.getElementById('root').style.setProperty('--fuel-fill-color', `rgba(${47+(diff>=250?208/250*(500-diff):208)}, ${47+(diff>=250?208:208/250*diff)}, 0, 0.25`)
  }

  return (
    <>
      <div className='rightPanel'>
        <div className='signal'>
            <Signal connection={connection}/>
            <div className='label'>{connection?'Статус связи: стабильный':'Статус связи: нестабильный'}</div>
          </div>
          <div>
            <div className='damageState'>
              <DamageState/>
            </div>
          </div>
      </div>
      <div className='center'>
        <div className='map'>
          <Map clientDest={dest} setClientDest={data=>setDest(data)} ship={ship} objects={objects}/>
        </div>
        <div>
          <InfoBox text='Мои координаты:' x = {ship.x} y = {ship.y}/>
          <button disabled={dest.x==ship.x&&dest.y==ship.y||fuelStore==0} 
           onClick={()=>serverRequest(dest, ship, data=>setShip(data), data=>toggleConnection(data), data=>setObjects(data),
           data=>handleFuel(data))}>
              Лететь!
          </button>
          <InfoBox text='Пункт назначения:' x={dest.x} y={dest.y}/>
        </div>
      </div>
      <div className='leftPanel'>
        <div className='fuelState'>
          <FuelState fuelPerc={fuelPerc}/>
          <div className='label'>Запас топлива</div>
        </div>
      </div>
    </>
  )
}

export default App
