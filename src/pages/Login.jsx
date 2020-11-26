import React, {useState} from 'react';
import {useAuth} from '../context/auth';
import axios from '../utils/axios';
import {Redirect} from 'react-router';
import {Button, Card, Col, Row, TextInput} from "react-materialize";

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setAuthToken} = useAuth();

    const onLoginClick = () => {
        if (!username || !password) {
            setIsError(false);
            return;
        }

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
        <div style={{marginTop: '150px'}}>
            <Row>
                <Col
                    m={6}
                    s={12}
                    offset="m3"
                >
                    <Card
                        actions={[
                            <div className="center-align"
                                 key={1}
                            >
                                <Button
                                    onClick={onLoginClick}
                                    node="button"
                                    waves="light"
                                    className="teal"
                                    large
                                >
                                    Submit
                                </Button>
                            </div>
                        ]}
                    >
                        <h1 className="center-align">Sign in</h1>

                        <div className="row">
                            <div className="col s12">
                                <TextInput
                                    id="username-input"
                                    label="Username"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    s={12}
                                />
                            </div>

                            <div className="col s12">
                                <TextInput
                                    id="password-input"
                                    label="Password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    password
                                    s={12}
                                />
                            </div>
                        </div>

                        {isError &&
                        <div className="card-panel red lighten-1 white-text center-align">The username or password
                            provided were incorrect!</div>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
