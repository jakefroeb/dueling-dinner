import { useState, useContext } from "react"
import { Button, Card, CardImg, ListGroup } from "react-bootstrap"
import { userStorageKey } from "../auth/authSettings"
import { DuelContext } from "../duels/DuelProvider"
import { BusinessContext } from "./BusinessProvider"
import "./Business.css"

export const Business = () => {
    const [index, setIndex] = useState(0)
    const {saveDuelMatches, duelId} = useContext(DuelContext)
    const {matchingBusinesses, businesses} = useContext(BusinessContext)
    let allBusinesses = []
    allBusinesses = matchingBusinesses.concat(businesses)
    matchingBusinesses.forEach(business => {
        const duplicate = businesses.find(b => b.id === business.id)
        allBusinesses.splice(allBusinesses.indexOf(duplicate),1)
    });
    //this code will take the matches and combine them with the businesses from the lat lon call
    //then it removes duplicates
    const handleYes = (e) =>{
        e.preventDefault()
        saveDuelMatches({
            duelId : duelId,
            userId : parseInt(sessionStorage.getItem(userStorageKey)),
            restaurantId : e.target.value
        })
        let tempIndex = index + 1
        setIndex(tempIndex)
    }
    //when a user hits yes it will save a duel match and then display the next business in the array
    
    const handleNo = (e) => {
        let tempIndex = index + 1
        setIndex(tempIndex)
    }
    return(
        <>
            <Card classname="businessCard">
                <CardImg classname="businessImage" variant="top" src={allBusinesses[index].image_url} />
                <Card.Body>
                <Card.Title>{allBusinesses[index].name}</Card.Title>
                <ListGroup variant="flush">
                        <ListGroup.Item>{allBusinesses[index].price}</ListGroup.Item>
                        <ListGroup.Item>{allBusinesses[index].rating}</ListGroup.Item>
                        <ListGroup.Item>{allBusinesses[index].review_count}</ListGroup.Item>
                        <ListGroup.Item>{allBusinesses[index].distance}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Button variant="success" value={allBusinesses[index].id} onClick={handleYes}>Yes</Button>
                <Button variant="danger" onClick={handleNo}>No</Button>
            </Card>
        </>
    )

}