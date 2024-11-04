import {useState, useEffect} from 'react'
import Signal from './Signal.jsx'
import DamageState from './DamageState.jsx'
import FuelState from './FuelState.jsx'
import InfoBox from './InfoBox.jsx'
import './App.css'

function App() {
  const [x, setX] = useState(200);
  const [y, setY] = useState(400);
  useEffect(()=> {
    
  }, []
  )
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
          <div/>
        </div>
        <div>
          <InfoBox text='Мои координаты:' x = '0' y = '0'/>
          <button>Лететь!</button>
          <InfoBox text='Пункт назначения:' x='100' y = '100'/>
        </div>
      </div>
      <div className='leftPanel'>
        <div className='fuelState'>
          <FuelState/>
        </div>
      </div>
    </>
  )
  /*
      <div>
        <div className='coordinateInput'>
          <p>x:</p>
          <input value={x} onChange={e=>setX(e.target.value)}/>
        </div>
        <div className='coordinateInput'>
            <p>y:</p>
            <input value={y} onChange={e=>setY(e.target.value)}/>
        </div>
    </div>
  */
}

export default App
