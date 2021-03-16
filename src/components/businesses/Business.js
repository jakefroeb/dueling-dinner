import { useState } from "react"

export const Business = ({businesses}) => {
    // distance
    const [index, setIndex] = useState(0)
    const handleYes = (e) =>{
        e.preventDefault()
        let tempIndex = index + 1
        setIndex(tempIndex)
    }
    const handleNo = (e) => {

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
            <button onClick={handleYes}>Yes</button>
            <button>No</button>
        </>
    )

}