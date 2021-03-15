import './App.css';
import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"

function App() {
  return (
    <div className="duelingDinner">
      <header className="duelingDinner-header">
        Dueling Dinner
      </header>
      <Route render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
              //Components that are rendered when the user is authenticated go inside this React fragment
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
