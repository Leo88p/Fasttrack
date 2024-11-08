import {useState, useEffect} from 'react'
import Signal from './Signal.jsx'
import DamageState from './DamageState.jsx'
import FuelState from './FuelState.jsx'
import InfoBox from './InfoBox.jsx'
import Map from './Map.jsx'
import './App.css'

function App() {
  const [dest, setDest] = useState({
    x: 5,
    y: 5
  })

  function serverRequest() {
    fetch('https://caranferen.ru/api/space/locate?'+ new URLSearchParams({
      x: x,
      y: y,
    }).toString())
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw new Error("Response was unsuccesful")
      }
    })
    .then(data => console.log(data))
    .catch((Error)=>console.log(Error))
  }
  

  return (
    <>
      <div className='rightPanel'>
        <div className='signal'>
            <Signal/>
          </div>
          <div>
            <div className='damageState'>
              <DamageState/>
            </div>
          </div>
      </div>
      <div className='center'>
        <div className='map'>
          <Map clientDest={dest} setClientDest={data=>{setDest(data)}}/>
        </div>
        <div>
          <InfoBox text='Мои координаты:' x = '0' y = '0'/>
          <button>Лететь!</button>
          <InfoBox text='Пункт назначения:' x={dest.x} y={dest.y}/>
        </div>
      </div>
      <div className='leftPanel'>
        <div className='fuelState'>
          <FuelState/>
        </div>
      </div>
    </>
  )
}

export default App
