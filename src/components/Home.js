import { useState } from "react"
import { BusinessList } from "./businesses/BusinessList"
import { BusinessProvider } from "./businesses/BusinessProvider"
import { DuelProvider } from "./duels/DuelProvider"
import { PendingDuelList } from "./duels/PendingDuelList"
import { UserProvider } from "./users/UserProvider"
import { UserSelect } from "./users/UserSelect"

export const Home = () => {
    const [duelStarted, setDuelStarted] = useState(false)

    return <div className="contentContainer">
            {!duelStarted ? 
            <>
        <div className="pendingDuels">

        </div>
            
        <div className="startDuel">
            <UserProvider>
                <DuelProvider>
                    <h3>Start a duel</h3>
                    <UserSelect setDuelStarted = {setDuelStarted}/>
                    <PendingDuelList/>
                </DuelProvider>
            </UserProvider> 
        </div>
        </>
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