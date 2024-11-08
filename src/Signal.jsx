import Wifi from './assets/Wi-fi.svg?react'
import NoSignal from './assets/No-signal.svg?react'
function Signal({connection}) {
    return (
        <>
            {connection&&<Wifi/>}
            {!connection&&<NoSignal/>}
        </>
    )
}
export default Signal