import { createContext, useState } from "react";
import { userStorageKey } from "../auth/authSettings";

export const DuelContext = createContext()

export const DuelProvider = (props) => {
    const [duelId, setDuelId] = useState(0)
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
        debugger
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
        .then(res => setDuelId(res.id))

    }
    return(
        <DuelContext.Provider value={{initializeDuel, duelId, saveDuelMatches}}>
            {props.children}
        </DuelContext.Provider>
    )
}