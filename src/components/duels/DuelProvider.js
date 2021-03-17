import { createContext, useState } from "react";
import { userStorageKey } from "../auth/authSettings";

export const DuelContext = createContext()

export const DuelProvider = (props) => {
    const [duelId, setDuelId,] = useState(0)
    const [pendingDuels, setPendingDuels] = useState([])
    const saveDuelMatches = (duelMatches) =>{
        return fetch("http://localhost:8088/duelMatches",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(duelMatches)
        })
    }
    const initializeDuel = (receiverId) => {
        return fetch("http://localhost:8088/duels",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userId: parseInt(sessionStorage.getItem(userStorageKey)),
                receiverId: receiverId,
                timeStamp: Date.now(),
                completed: false,
                finalDecision: "",
                finalDecisionId: ""
            })
        }).then(res => res.json())
        .then(res=> {
            let id = res.id
            console.log(res.id)
            setDuelId(id => {console.log(duelId)})
        })
        .then(()=> console.log(duelId))
    }
    const getPendingDuels = () => {
        return fetch(`http://localhost:8088/duels?receiverId=${sessionStorage.getItem(userStorageKey)}&_expand=user`)
        .then(res => res.json())
        .then(setPendingDuels)
    }
    const deleteDuel = (duelId) => {
        return fetch(`http://localhost:8088/duels/${duelId}`,{
            method:"DELETE"
        })
        .then(()=> fetch(`http://localhost:8088/duelMatches?duelId=${duelId}`))
    }
    return(
        <DuelContext.Provider value={{initializeDuel, duelId, saveDuelMatches, getPendingDuels, pendingDuels, deleteDuel}}>
            {props.children}
        </DuelContext.Provider>
    )
}