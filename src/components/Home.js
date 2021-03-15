import { UserProvider } from "./users/UserProvider"
import { UserSelect } from "./users/UserSelect"

export const Home = () => {
    

    return <div className="contentContainer">
        <div className="pendingDuels"></div>
        <div className="startDuel">
            <h3>Start a duel</h3>
            <UserProvider>
                <UserSelect/>
            </UserProvider>
        
        {/* need to make this do something */}
        </div>
        <div className="completedDuels"></div>
    </div>
}