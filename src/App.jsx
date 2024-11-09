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
          <button disabled={dest.x==ship.x&&dest.y==ship.y} 
           onClick={()=>serverRequest(dest, data=>setShip(data), data=>toggleConnection(data), data=>setObjects(data))}>
              Лететь!
          </button>
          <InfoBox text='Пункт назначения:' x={dest.x} y={dest.y}/>
        </div>
      </div>
      <div className='leftPanel'>
        <div className='fuelState'>
          <FuelState/>
          <div className='label'>Запас топлива</div>
        </div>
      </div>
    </>
  )
}

export default App
