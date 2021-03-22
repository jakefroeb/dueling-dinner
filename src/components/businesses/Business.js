import { useState, useContext, useEffect } from "react"
import { userStorageKey } from "../auth/authSettings"
import { DuelContext } from "../duels/DuelProvider"
import { BusinessContext } from "./BusinessProvider"

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
    const handleYes = (e) =>{
        e.preventDefault()
        console.log(duelId)
        saveDuelMatches({
            duelId : duelId,
            userId : parseInt(sessionStorage.getItem(userStorageKey)),
            restaurantId : e.target.value
        })
        let tempIndex = index + 1
        setIndex(tempIndex)
    }
    const handleNo = (e) => {
        let tempIndex = index + 1
        setIndex(tempIndex)
    }
    return(
        <>
            <h2>{allBusinesses[index].name}</h2>
            <img src={allBusinesses[index].image_url} alt="img"></img>
            {allBusinesses[index].categories.map(category => <p key={category.title}>{category.title}</p>)}
            <p>{allBusinesses[index].price}</p>
            <p>{allBusinesses[index].rating}</p>
            <p>{allBusinesses[index].review_count}</p>
            <p>{allBusinesses[index].distance}</p>
            <button onClick={handleYes} value={allBusinesses[index].id}>Yes</button>
            <button onClick={handleNo}>No</button>
        </>
    )

}