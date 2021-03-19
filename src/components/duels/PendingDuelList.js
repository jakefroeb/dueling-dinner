import { useContext, useEffect } from "react"
import { DuelContext } from "./DuelProvider"

export const PendingDuelList = ({setDuelStarted}) => {
    const {getPendingDuels, pendingDuels, deleteDuel, setDuelId, completeDuel} = useContext(DuelContext)

    useEffect(()=>{
        getPendingDuels()
    },[])
    const rejectDuel = (e) => {
        e.preventDefault()
        deleteDuel(parseInt(e.target.value))
        .then(getPendingDuels)
    }
    const acceptDuel = (e) => {
        e.preventDefault()
        setDuelId(parseInt(e.target.value))
        completeDuel(e.target.value)
        setDuelStarted(true)
    }

    return(
        
        <div className="pending duels">
        {pendingDuels.length ?
            pendingDuels.map(pendingDuel => <div className="pendingDuelCard" key={pendingDuel.id}>
                <p key={pendingDuel.user.name}>from : {pendingDuel.user.name}</p>
                <p key={pendingDuel.timeStamp}>sent : {new Date(pendingDuel.timeStamp).toLocaleString()}</p>
                <button key={pendingDuel.id+2} className="acceptButton" value={pendingDuel.id} onClick={acceptDuel}>Accept</button>
                <button key={pendingDuel.id+1} className="declineButton" value={pendingDuel.id} onClick={rejectDuel}>Decline</button>
            </div>)

        : <p>No Pending Duels</p>}
        
        </div>
    )

}