import React, {useState} from 'react';
import {useAuth} from '../context/auth';
import axios from '../utils/axios';
import {Redirect} from 'react-router';

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setAuthToken} = useAuth();

    const onLoginClick = () => {
        axios.post('/login_check', {
            username,
            password
        }).then(result => {
            if (result.status === 200) {
                setAuthToken(result.data.token);
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(() => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <label htmlFor="username">Username</label>
            <input type="text"
                   placeholder="username"
                   value={username}
                   onChange={event => setUsername(event.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={event => setPassword(event.target.value)}/>

            <button onClick={onLoginClick}>Submit</button>
            {isError && <div>The username or password provided were incorrect!</div>}
        </div>
    );
}

export default Login;
