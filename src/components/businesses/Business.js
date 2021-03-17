import { useState, useContext } from "react"
import { userStorageKey } from "../auth/authSettings"
import { DuelContext } from "../duels/DuelProvider"

export const Business = ({businesses}) => {
    const [index, setIndex] = useState(0)
    const {saveDuelMatches, duelId} = useContext(DuelContext)
    const handleYes = (e) =>{
        e.preventDefault()
        console.log(duelId)
        saveDuelMatches({
            duelId : duelId,
            userId : sessionStorage.getItem(userStorageKey),
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
            <h2>{businesses[index].name}</h2>
            <img src={businesses[index].image_url} alt="img"></img>
            {businesses[index].categories.map(category => <p key={category.title}>{category.title}</p>)}
            <p>{businesses[index].price}</p>
            <p>{businesses[index].rating}</p>
            <p>{businesses[index].review_count}</p>
            <p>{businesses[index].distance}</p>
            <button onClick={handleYes} value={businesses[index].id}>Yes</button>
            <button onClick={handleNo}>No</button>
        </>
    )

}