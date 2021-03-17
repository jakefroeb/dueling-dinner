import { useContext } from "react"
import Countdown from "react-countdown"
import { BusinessContext } from "../businesses/BusinessProvider"

export const Timer = ({setDuelStarted}) => {
    const {setShowBusiness} = useContext(BusinessContext)
    const timerDone = () =>{
        setShowBusiness(false)
        setDuelStarted(false)
    }
    return (
        <Countdown date={Date.now() + 5000}
            onComplete={timerDone}
            >
            <p>Timer Over</p>
        </Countdown>
    )
}