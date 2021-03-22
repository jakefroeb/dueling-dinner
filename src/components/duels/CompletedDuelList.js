import { useContext, useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { BusinessContext } from "../businesses/BusinessProvider"
import { DuelContext } from "./DuelProvider"
import { Match } from "./Match"

export const CompletedDuelList = () => {
    const {getCompletedDuels, completedDuels, getMatches} = useContext(DuelContext)
    const {getBusinessById} = useContext(BusinessContext)
    const [finalMatches, setFinalMatches] = useState([])
    useEffect(()=>{
        getCompletedDuels()
    },[])
    let tempFinalMatches = []
    const showMatches = (e) =>{
        e.preventDefault()
        getMatches(parseInt(e.target.value))
        .then(matches => {
            matches.forEach(match => {
            let tempMatchRestaurantId = match.restaurantId
            let tempMatchId = match.id
            let tempMatch = matches.find(match => match.id !== tempMatchId && match.restaurantId === tempMatchRestaurantId)
            if(tempMatch){
                tempFinalMatches.push(tempMatch)
            }})
            let finalMatchArray = tempFinalMatches.filter(finalMatch => finalMatch.userId === parseInt(sessionStorage.getItem(userStorageKey)))
            setFinalMatches(finalMatchArray)
            console.log(finalMatchArray)
        })
    }

    
    return (
        
        <div className="completed duels">
            {console.log(finalMatches)}
        {completedDuels.length ?
            completedDuels.map(completedDuel => <div className="pendingDuelCard" key={completedDuel.id}>
                <p key={completedDuel.user.name}>from : {completedDuel.user.name}</p>
                <p key={completedDuel.timeStamp}>sent : {new Date(completedDuel.timeStamp).toLocaleString()}</p>
                <button key={completedDuel.id} value={completedDuel.id} onClick={showMatches}>view matches</button>
                {finalMatches? <div className="matches">
                    {finalMatches.map(finalMatch => {
                        return <Match key={finalMatch.id} match={finalMatch}/>
                        }  
                        )
                        }
                </div>:<></>}
            </div>)

        : <p>No Completed Duels</p>}
        
        </div>

        
    )
}