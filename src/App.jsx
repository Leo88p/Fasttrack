import {useState, useEffect} from 'react'
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
      <div className='coordinateInput'>
        <p>x:</p>
        <input value={x} onChange={e=>setX(e.target.value)}/>
      </div>
      <div className='coordinateInput'>
        <p>y:</p>
        <input value={y} onChange={e=>setY(e.target.value)}/>
      </div>
      <button onClick={serverRequest}>Позвонить на базу</button>
    </>
  )
}

export default App
