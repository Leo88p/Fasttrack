import {distToFuel} from '../src/Transform.js'
export default function serverRequest(dest, ship, setShip, setConnection, setObjects, setFuelStore) {
    fetch('https://caranferen.ru/api/space/locate?'+ new URLSearchParams({
      x: dest.x,
      y: dest.y,
    }).toString())
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw new Error("Response was unsuccesful")
      }
    })
    .then(data => {
        if(data.status == 'success') {
            setFuelStore(distToFuel({x:ship.x-dest.x, y:ship.y-dest.y}))
            setShip(dest)
            setConnection(true)
            setObjects(data.items)
        }
        else {
            setConnection(false)
        }
    })
    .catch((Error)=>{setConnection(false); return 'Нет связи с базой. Попробуйте ещё раз'})
  }