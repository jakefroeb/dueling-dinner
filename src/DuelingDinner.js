import './App.css';
import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import { Home } from './components/Home';
import './DuelingDinner.css'

function App() {
  return (
    <div className="duelingDinner">
      <header className="duelingDinner-header">
        <h1>Dueling Dinner</h1>
      </header>
      <Route render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
              <Home/>
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
    }} />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    </div>
  );
}

export default App;
