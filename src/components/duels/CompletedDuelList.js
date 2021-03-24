import { useContext, useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { DuelContext } from "./DuelProvider"
import { Match } from "./Match"

export const CompletedDuelList = () => {
    const {getCompletedDuels, completedDuels, getMatches, deleteDuel} = useContext(DuelContext)
    const [finalMatches, setFinalMatches] = useState([])
    const [showMatch, setShowMatch] = useState(false)
    const [clickId, setClickId] = useState(0)
    useEffect(()=>{
        getCompletedDuels()
    },[])

    let tempFinalMatches = []
    const showMatches = (e) =>{
        e.preventDefault()
        setClickId(parseInt(e.target.value))
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
                .then(getCompletedDuels)
                console.log("hey there  no matches")
            }
            let finalMatchArray = tempFinalMatches.filter(finalMatch => finalMatch.userId === parseInt(sessionStorage.getItem(userStorageKey)))
            setFinalMatches(finalMatchArray)
            setShowMatch(true)
            
        })
    }
    // clickId is the id of the duel selected to show the matches
    // then find the matches that match restaurant ids but not matching itself
    //

    
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
                {/* This needs to be a popup modal or quote 
                ternary checking for the matches in eatch duel*/}
                {finalMatches && showMatch && completedDuel.id === clickId? 
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