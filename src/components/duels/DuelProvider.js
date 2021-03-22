import { createContext, useState } from "react";
import { userStorageKey } from "../auth/authSettings";

export const DuelContext = createContext()

export const DuelProvider = (props) => {
    const [duelId, setDuelId] = useState(0)
    const [pendingDuels, setPendingDuels] = useState([])
    const [receiver, setReceiver] = useState(false)
    const [completedDuels, setCompletedDuels] = useState([])
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
        .then(res=> setDuelId(res.id))
    }
    const getPendingDuels = () => {
        return fetch(`http://localhost:8088/duels?receiverId=${sessionStorage.getItem(userStorageKey)}&completed=false&_expand=user`)
        .then(res => res.json())
        .then(setPendingDuels)
    }
    const getCompletedDuels = () => {
        return fetch(`http://localhost:8088/duels?receiverId=${sessionStorage.getItem(userStorageKey)}&completed=true&_expand=user`)
        .then(res => res.json())
        .then(setCompletedDuels)
    }
    const deleteDuel = (duelId) => {
        return fetch(`http://localhost:8088/duels/${duelId}`,{
            method:"DELETE"
        })
        .then(()=> fetch(`http://localhost:8088/duelMatches?duelId=${duelId}`))
    }
    const completeDuel = (duelId) => {
        return fetch(`http://localhost:8088/duels/${duelId}`,{
            method:"PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                "completed" : true
            })
        })
        .then(setReceiver(true))
    }
    const getMatches = (duelId) => {
        return fetch(`http://localhost:8088/duelMatches?duelId=${duelId}`)
        .then(res => res.json())
    }
    return(
        <DuelContext.Provider value={{initializeDuel, duelId, saveDuelMatches, getPendingDuels, pendingDuels, deleteDuel, setDuelId, completeDuel, setReceiver, receiver, getMatches, completedDuels, getCompletedDuels}}>
            {props.children}
        </DuelContext.Provider>
    )
}