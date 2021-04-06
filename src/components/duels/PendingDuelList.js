import { useContext, useEffect } from "react"
import { Button, Card, ListGroup } from "react-bootstrap"
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
    //rejecting duel will delete duel
    const acceptDuel = (e) => {
        e.preventDefault()
        setDuelId(parseInt(e.target.value))
        completeDuel(e.target.value)
        setDuelStarted(true)
    }
    //accept duel will start a duel with setting duel Id which will need to be accessed for saving duelMatches
    //complete duel will patch the duel to change completed to true

    return(
        
        <div className="pending duels">
            <h3>Pending Duels</h3>
            {/* ternary protecting code from showing error for not having data in it */}
        {pendingDuels.length ?
            pendingDuels.map(pendingDuel => 
                <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title>From : {pendingDuel.user.name}</Card.Title>
                    
                    <ListGroup variant="flush">
                        <ListGroup.Item>sent : {new Date(pendingDuel.timeStamp).toLocaleString()}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="success" value={pendingDuel.id} onClick={acceptDuel}>Accept</Button>
                    <Button variant="danger" value={pendingDuel.id} onClick={rejectDuel}>Decline</Button>
                    </Card.Body>
                    </Card>
            )

        : <p>No Pending Duels</p>}
        
        </div>
    )

}