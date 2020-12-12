import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-materialize";
import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "../utils/axios";
import {sha256} from "../utils/crypto";

const Mining = () => {
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        axios.get('/mining/get-data').then((result) => {
            const transactions = result.data.committed_transactions,
                lastBlockHash = result.data.last_block_hash,
                jsonTransactions = JSON.stringify(transactions);

            const recursive = (nonce) => {
                const string = nonce + lastBlockHash + jsonTransactions;
                sha256(string).then(r => {
                    if (r.startsWith('000')) {
                        console.log('Successful hash - ' + r);
                        console.log(string);
                        axios.post('/mining/close-block', {
                            last_block_hash: lastBlockHash,
                            new_nonce: nonce
                        }).then((result) => {
                            console.log(result);
                        });
                    } else {
                        console.log(r);

                        recursive(nonce + 1);
                    }
                });
            };

            recursive(0);
        });
    }, []);


    return (
        <div style={{marginTop: '150px'}}>
            <Row>
                <Col
                    m={6}
                    s={12}
                    offset="m3"
                >
                    <Card>
                        <h1 className="center-align">Mining</h1>

                        {inProgress ?
                            <>
                                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                                    <Loader
                                        type="Oval"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}

                                    />
                                </div>
                                <p style={{fontSize: '20px', margin: '50px 0'}} className="center-align">
                                    Mining in progress
                                </p>
                                <div className="card-panel green white-text center-align">You've got correct hash! 50
                                    coins were added to your balance.
                                </div>
                            </>
                            :
                            <>
                                <p style={{fontSize: '20px', margin: '50px 0'}} className="center-align">Here you can
                                    mine
                                    some coins - you will get 50 coins per correct hash. Just press 'Start'
                                    button to enroll in all this mining staff.</p>

                                <div className="row">
                                    <div className="col s12">
                                        <Button
                                            onClick={() => setInProgress(true)}
                                            node="button"
                                            waves="light"
                                            className="green"
                                            style={{display: 'block', margin: '0 auto'}}
                                            type="submit"
                                            large
                                        >
                                            Start
                                        </Button>
                                    </div>
                                </div>
                            </>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Mining;
