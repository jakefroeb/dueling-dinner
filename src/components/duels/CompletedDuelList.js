import { useContext, useEffect, useState } from "react"
import { Button, Card, ListGroup, Modal } from "react-bootstrap"
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
    const handleClose = () => setShowMatch(false)
    
    return (
        
        <>
            <h3>CompletedDuels</h3>
        {completedDuels.length ?
            <div className="completed duels">
            {completedDuels.map(completedDuel => 
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {completedDuel.userId === parseInt(sessionStorage.getItem(userStorageKey)) ? 
                    <Card.Title>My Duel</Card.Title>
                    : <Card.Title>From : {completedDuel.user.name}</Card.Title>
                    }
                    <ListGroup variant="flush">
                        <ListGroup.Item>sent : {new Date(completedDuel.timeStamp).toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Final Desicion : {completedDuel.finalDecision}</ListGroup.Item>
                    </ListGroup>
                        <Modal show={finalMatches && showMatch && completedDuel.id === clickId} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Matches</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {finalMatches.map(finalMatch => {
                                    return <Match key={finalMatch.id} match={finalMatch} userId={completedDuel.user.id} duelId={completedDuel.id} setShowMatch={setShowMatch}/>
                                })}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                            </Modal>
                    <Button variant="primary" value={completedDuel.id} onClick={showMatches}>view matches</Button>
                  </Card.Body>
                  </Card>
           )}
        </div>
        : <p>No Completed Duels</p>
                }
                </>
        
    )
}