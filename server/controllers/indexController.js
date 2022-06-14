const fetch = require('node-fetch');

let myHeaders = new fetch.Headers();
myHeaders.append('project_id', 'testnetOZvrsaEPH8PLjH9XVVgtzK8TXJYnbvsA');
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
};

// querying a transaction by a specific id
const transactionIdUtxos = async (req, res) => {
    
    const transactionId = req.params.id;
    // const transactionId = "027034b65dc469983761ed071aca90beda2f6a4abebabac80cfdd419161298da";

    try {
        const api_url = `https://cardano-testnet.blockfrost.io/api/v0/txs/${transactionId}/utxos`;
        const fetch_response = await fetch(api_url, requestOptions);
        const fetch_json = await fetch_response.json();
        return res.json({transaction_Id: fetch_json});
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
};

// querying a specific account
const accountInfo = async (req, res) => {
    
    const accountId = req.params.id;
    // const accountId = "stake_test1urkatgpm4jk7eechqm8sypaua8h00zjnhuxyunwlg05gehsrlhwrk"

    try {
        const api_url = `https://cardano-testnet.blockfrost.io/api/v0/accounts/${accountId}`;
        const fetch_response = await fetch(api_url, requestOptions);
        const fetch_json = await fetch_response.json();
        return res.json({account_Id: fetch_json});
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
};




module.exports = { transactionIdUtxos, accountInfo };
