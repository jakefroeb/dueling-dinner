import { useContext, useEffect } from "react"
import { DuelContext } from "./DuelProvider"

export const PendingDuelList = () => {
    const {getPendingDuels, pendingDuels} = useContext(DuelContext)

    useEffect(()=>{
        getPendingDuels()
    },[])

    return(
        
        <div className="pending duels">
            {console.log(pendingDuels)}
        {pendingDuels.length ?
            pendingDuels.map(pendingDuel => <div className="pendingDuelCard" key={pendingDuels.id}>
                <p key={45}>from : {pendingDuel.user.name}</p>
                <p key={35}>sent : {new Date(pendingDuel.timeStamp).toString()}</p>
                <button key={pendingDuel.id+2} className="acceptButton" value={pendingDuel.id}>Accept</button>
                <button key={pendingDuel.id+1} className="declineButton" value={pendingDuel.id}>Decline</button>
            </div>)

        : <p>No Pending Duels</p>}
        
        </div>
    )

}