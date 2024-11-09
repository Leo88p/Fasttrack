export default function serverRequest(dest, setShip, setConnection, setObjects) {
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
      console.log(data)
        if(data.status == 'success') {
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