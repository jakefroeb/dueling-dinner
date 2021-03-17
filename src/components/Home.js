import { useState } from "react"
import { BusinessList } from "./businesses/BusinessList"
import { BusinessProvider } from "./businesses/BusinessProvider"
import { DuelProvider } from "./duels/DuelProvider"
import { UserProvider } from "./users/UserProvider"
import { UserSelect } from "./users/UserSelect"

export const Home = () => {
    const [duelStarted, setDuelStarted] = useState(false)

    return <div className="contentContainer">
        <div className="pendingDuels"></div>
            {!duelStarted ? 
        <div className="startDuel">
            <h3>Start a duel</h3>
            <UserProvider>
                <DuelProvider>
                    <UserSelect setDuelStarted = {setDuelStarted}/>
                </DuelProvider>
            </UserProvider> 
        </div>
            : <></>}
            {duelStarted ?
                <div className="duelInProgress">
                    <h3>Duel in Progress</h3> 
                    <BusinessProvider>
                        <DuelProvider>
                            <BusinessList setDuelStarted={setDuelStarted}/>
                        </DuelProvider>
                    </BusinessProvider>
                </div> 
            : <></>}
        <div className="completedDuels"></div>
    </div>
}