import React from 'react';

const Account = () => {
    return <>
        <h1 className="center-align">Account</h1>
        <div className="account-content">
            <div className="account-content__left">
                <h4>Account details</h4>
                <div><strong>First name:</strong> Vyacheslav</div>
                <div><strong>Last name:</strong> Kovalchuk</div>
                <div><strong>Username:</strong> vyacheslav-kovalchuk</div>
                <div><strong>Balance:</strong> 10 000 coins</div>
            </div>
            <div className="account-content__right">
                <h4>Last transactions</h4>
                <div className="card-panel grey white-text center-align"><strong>To:</strong> sergey-burukin, <strong>amount:
                    2 000</strong></div>
                <div className="card-panel green white-text center-align"><strong>From:</strong> ivan-dudrov, <strong>amount:
                    1 000</strong></div>
                <div className="card-panel green white-text center-align">
                    <strong>From:</strong> sergey-burukin, <strong>amount: 1 000</strong></div>
            </div>
        </div>
    </>;
}

export default Account;
