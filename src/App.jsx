import React, {useState} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import {AuthContext} from './context/auth';
import PrivateRoute from './hoc/PrivateRoute';
import Register from "./pages/Register";

function App() {
    const existingAuthToken = localStorage.getItem('auth_token');
    const [authToken, setStateAuthToken] = useState(existingAuthToken);

    const setAuthToken = (newToken) => {
        localStorage.setItem('auth_token', newToken);
        setStateAuthToken(newToken);
    }

    return (
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            <Router>
                <div>
                    <header>
                        <nav className="teal lighten-1">
                            <ul>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                                <li><NavLink to="/home">Home</NavLink></li>
                            </ul>
                        </nav>
                    </header>

                    <div className="content">
                        <Switch>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <PrivateRoute path='/' component={Home}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
