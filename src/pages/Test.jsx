import React, {useEffect, useState} from 'react';

import axios from '../utils/axios';

const Test = () => {
    const [message, setMessage] = useState();

    useEffect(() => {
        axios('/test').then((response) => {
            setMessage(response.data.message);
        });
    }, []);

    return <>
        <h1>Test</h1>
        <p>{message}</p>
    </>;
};

export default Test;
