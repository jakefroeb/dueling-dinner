import { useContext, useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { BusinessContext } from "../businesses/BusinessProvider"
import { DuelContext } from "./DuelProvider"
import { Match } from "./Match"

export const CompletedDuelList = () => {
    const {getCompletedReceivedDuels, completedDuels, getMatches, deleteDuel} = useContext(DuelContext)
    const [finalMatches, setFinalMatches] = useState([])
    const [showMatch, setShowMatch] = useState(false)
    useEffect(()=>{
        getCompletedReceivedDuels()
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
            if(!tempFinalMatches.length){
                deleteDuel(parseInt(e.target.value))
                .then(getCompletedReceivedDuels)
                console.log("hey there  no matches")
            }
            let finalMatchArray = tempFinalMatches.filter(finalMatch => finalMatch.userId === parseInt(sessionStorage.getItem(userStorageKey)))
            setFinalMatches(finalMatchArray)
            setShowMatch(true)
            
        })
    }

    
    return (
        
        <>
        {completedDuels.length ?
            <div className="completed duels">
            <h3>CompletedDuels</h3>
            {completedDuels.map(completedDuel => <div className="completedDuelCard" key={completedDuel.id}>
                <p key={completedDuel.user.name}>from : {completedDuel.user.name}</p>
                <p key={completedDuel.timeStamp}>sent : {new Date(completedDuel.timeStamp).toLocaleString()}</p>
                <p>Final Desicion : {completedDuel.finalDecision}</p>
                <button key={completedDuel.id} value={completedDuel.id} onClick={showMatches}>view matches</button>
                {/* This needs to be a popup modal or quote */}
                {finalMatches && showMatch? 
                <div className="matches">
                    {finalMatches.map(finalMatch => {
                        return <Match key={finalMatch.id} match={finalMatch} userId={completedDuel.user.id} duelId={completedDuel.id} setShowMatch={setShowMatch}/>
                    })}
                </div>
                :<></>}
            </div>)}
        </div>
        : <p>No Completed Duels</p>}
                </>
        

        
    )
}