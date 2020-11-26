import React, {useState} from 'react';
import {Button, Card, Col, Row, TextInput} from "react-materialize";
import axios from "../utils/axios";
import {useAuth} from "../context/auth";
import {Redirect} from "react-router";


const Register = () => {
    const {setAuthToken} = useAuth();
    const [isError, setIsError] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [userData, setUserData] = useState({
        first_name: {
            value: '',
            error: null
        },
        last_name: {
            value: '',
            error: null
        },
        username: {
            value: '',
            error: null
        },
        password: {
            value: '',
            error: null
        },
        password_confirm: {
            value: '',
            error: null
        },
    });

    const validate = (userProperty = null, newValue = null) => {
        const validateAll = userProperty === null;
        const validateAllErrors = {};

        let error = null;

        if (userProperty === 'first_name' || validateAll) {
            const value = newValue || userData.first_name.value;
            if (!value) {
                error = 'This value should not be blank';
                validateAllErrors.first_name = error;
            }

        }

        if (userProperty === 'last_name' || validateAll) {
            const value = newValue || userData.last_name.value;
            if (!value) {
                error = 'This value should not be blank';
                validateAllErrors.last_name = error;
            }
        }

        if (userProperty === 'username' || validateAll) {
            const value = newValue || userData.username.value;
            if (!value) {
                error = 'This value should not be blank';
                validateAllErrors.username = error;
            }
        }

        if (userProperty === 'password' || validateAll) {
            const value = newValue || userData.password.value;
            if (!value) {
                error = 'This value should not be blank';
                validateAllErrors.password = error;
            }
        }

        if (userProperty === 'password_confirm' || validateAll) {
            const value = newValue || userData.password_confirm.value;
            if (!value) {
                error = 'This value should not be blank';
                validateAllErrors.password_confirm = error;
            } else if (value !== userData.password.value) {
                error = 'Passwords should match';
                validateAllErrors.password_confirm = error;
            }
        }

        const newUserData = {...userData};

        if (!validateAll) {
            newUserData[userProperty] = {
                value: newValue,
                error
            }
        } else {
            for (const propertyName in validateAllErrors) {
                newUserData[propertyName].error = validateAllErrors[propertyName];
            }
        }

        setUserData(newUserData);
    };

    const onRegisterClick = (event) => {
        event.preventDefault();

        validate();

        for (const userProperty in userData) {
            if (userData[userProperty].error) {
                return;
            }
        }

        axios.post('/register', {
            first_name: userData.first_name.value,
            last_name: userData.last_name.value,
            username: userData.username.value,
            password: userData.password.value,
        }).then(result => {
            if (result.status !== 200) {
                setIsError(true);

                return;
            }
            if (result.data.token) {
                setAuthToken(result.data.token);
                setLoggedIn(true);
            } else if (result.data.validation_errors && typeof result.data.validation_errors === 'object') {
                const newUserData = {...userData};
                const validationErrors = result.data.validation_errors;

                for (const propertyName in validationErrors) {
                    if (newUserData[propertyName]) {
                        newUserData[propertyName].error = validationErrors[propertyName][0];
                    }
                }

                setUserData(newUserData);
            }
        }).catch(() => {
            setIsError(true);
        });
    }

    console.log(userData);

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
                    <form>
                        <Card
                            actions={[
                                <div className="center-align"
                                     key={1}
                                >
                                    <Button
                                        onClick={onRegisterClick}
                                        node="button"
                                        waves="light"
                                        className="teal"
                                        type="submit"
                                        large
                                    >
                                        Submit
                                    </Button>
                                </div>
                            ]}
                        >
                            <h1 className="center-align">Register</h1>

                            <div className="row">
                                <div className="col s12">
                                    <TextInput
                                        id="first_name-input"
                                        label="First name"
                                        value={userData.first_name.value}
                                        onChange={event => validate('first_name', event.target.value)}
                                        error={userData.first_name.error}
                                        className={userData.first_name.error ? 'invalid' : ''}
                                        s={12}
                                    />
                                </div>

                                <div className="col s12">
                                    <TextInput
                                        id="last_name-input"
                                        label="Last name"
                                        value={userData.last_name.value}
                                        onChange={event => validate('last_name', event.target.value)}
                                        error={userData.last_name.error}
                                        className={userData.last_name.error ? 'invalid' : ''}
                                        s={12}
                                    />
                                </div>

                                <div className="col s12">
                                    <TextInput
                                        id="username-input"
                                        label="Username (should be unique)"
                                        value={userData.username.value}
                                        onChange={event => validate('username', event.target.value)}
                                        error={userData.username.error}
                                        className={userData.username.error ? 'invalid' : ''}
                                        s={12}
                                    />
                                </div>

                                <div className="col s12">
                                    <TextInput
                                        id="password-input"
                                        label="Password"
                                        password
                                        value={userData.password.value}
                                        onChange={event => validate('password', event.target.value)}
                                        error={userData.password.error}
                                        className={userData.password.error ? 'invalid' : ''}
                                        s={12}
                                    />
                                </div>

                                <div className="col s12">
                                    <TextInput
                                        id="password-confirm-input"
                                        label="Password confirm"
                                        password
                                        value={userData.password_confirm.value}
                                        onChange={event => validate('password_confirm', event.target.value)}
                                        error={userData.password_confirm.error}
                                        className={userData.password_confirm.error ? 'invalid' : ''}
                                        s={12}
                                    />
                                </div>
                            </div>

                            {isError &&
                            <div className="card-panel red lighten-1 white-text center-align">Something went wrong!
                                Please, try again later</div>}
                        </Card>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default Register;
