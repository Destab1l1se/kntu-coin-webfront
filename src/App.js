import React from 'react';

import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {Route, Switch} from 'react-router';

import Home from './pages/Home';
import Test from './pages/Test';

function App() {
    return (
        <Router>
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/test">Test</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <div className="content">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/test' component={Test}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
