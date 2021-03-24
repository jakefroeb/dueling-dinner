import { useContext } from "react"
import Countdown from "react-countdown"
import { BusinessContext } from "../businesses/BusinessProvider"

export const Timer = ({setDuelStarted}) => {
    const {setShowBusiness} = useContext(BusinessContext)
    const timerDone = () =>{
        setShowBusiness(false)
        setDuelStarted(false)
    }
    //when timer ends resets showBusiness to false, and duelStarted which will trigger the ternaries to show the "home page"
    return (
        <Countdown date={Date.now() + 5000}
        // 5000 is 5 seconds
            onComplete={timerDone}
            >
            <p>Timer Over</p>
        </Countdown>
    )
}