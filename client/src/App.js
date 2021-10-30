import "./App.css";
import AuthState from "./context/authContext/AuthState";
import CharacterState from "./context/characterContext/CharacterState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import CharacterForm from "./components/characters/CharacterForm";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => (
    <AuthState>
        <CharacterState>
            <Router>
                <Navbar />
                <div
                    className="d-flex mx-auto justify-content-center align-items-center"
                    style={{ maxWidth: "1200px" }}
                >
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/form" component={CharacterForm} />
                    </Switch>
                </div>
            </Router>
        </CharacterState>
    </AuthState>
);

export default App;
