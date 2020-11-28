import React, {useState} from 'react';

import axios from '../utils/axios';
import {Button, Card, Col, Row, TextInput} from "react-materialize";

const SendCoins = () => {
    const [receiverUsername, setReceiverUsername] = useState('');
    const [coinQuantity, setCoinQuantity] = useState('');
    const [receiverUsernameError, setReceiverUsernameError] = useState(null);
    const [coinQuantityError, setCoinQuantityError] = useState(null);
    const [successfullySent, setSuccessfullySent] = useState(false);
    const [isError, setIsError] = useState(false);

    console.log(`Receiver username - ${receiverUsername}`);
    console.log(`Coin quantity - ${coinQuantity}`);

    const onSendClick = (e) => {
        e.preventDefault();

        setReceiverUsernameError(null);
        setCoinQuantityError(null);
        setIsError(false);
        setSuccessfullySent(false);

        axios.post('/send-coins', {
            receiver_username: receiverUsername,
            coin_quantity: coinQuantity
        }).then((result) => {
            const validationErrors = result.data.validation_errors;

            if (validationErrors) {
                if (validationErrors.receiver_username) {
                    setReceiverUsernameError(validationErrors.receiver_username[0]);
                }

                if (validationErrors.coin_quantity) {
                    setCoinQuantityError(validationErrors.coin_quantity[0]);
                }
            }

            if (result.data.status === 'ok') {
                setSuccessfullySent(true);
            }
        }).catch(() => {
            setIsError(true);
        });
    };

    const onCoinQuantityChange = (e) => {
        setCoinQuantity(e.target.value);
        setCoinQuantityError(null);
        setIsError(false);
    }

    const onReceiverUsernameChange = (e) => {
        setReceiverUsername(e.target.value);
        setReceiverUsernameError(null);
        setIsError(false);
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
                                    onClick={onSendClick}
                                    node="button"
                                    waves="light"
                                    className="teal"
                                    large
                                >
                                    Send
                                </Button>
                            </div>
                        ]}
                    >
                        <h1 className="center-align">Send coins</h1>

                        <div className="row">
                            <div className="col s12">
                                <TextInput
                                    id="receiver-username-input"
                                    label="Receiver username"
                                    value={receiverUsername}
                                    onChange={onReceiverUsernameChange}
                                    error={receiverUsernameError}
                                    className={receiverUsernameError ? 'invalid' : ''}
                                    s={12}
                                />
                            </div>

                            <div className="col s12">
                                <TextInput
                                    id="coin-quantity-input"
                                    label="Coin quantity"
                                    value={coinQuantity}
                                    onChange={onCoinQuantityChange}
                                    error={coinQuantityError}
                                    className={coinQuantityError ? 'invalid' : ''}
                                    type="number"
                                    min="1"
                                    s={12}
                                />
                            </div>
                        </div>

                        {isError &&
                        <div className="card-panel red lighten-1 white-text center-align">Something went wrong! Please,
                            try again later</div>}

                        {successfullySent &&
                        <div className="card-panel green white-text center-align">Coins were added to committed
                            transactions</div>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SendCoins;
