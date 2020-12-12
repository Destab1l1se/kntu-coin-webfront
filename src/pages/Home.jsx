import React from 'react';

const Home = () => {
    return (
        <div>
            <h1 className="center-align">Welcome to SlavaCoin!</h1>
            <p className="center-align" style={{fontSize: '20px', margin: '100px 200px'}}>This project is made for
                educational purposes and is distributed under MIT
                license, meaning that source
                code can be shared, used and modified by anyone. Now stop talking and <a href="#">start
                    sending coins</a> to someone or <a href="#">mine</a> some of them</p>
        </div>
    );
}

export default Home;
