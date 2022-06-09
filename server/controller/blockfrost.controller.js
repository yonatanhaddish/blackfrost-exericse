const fetch = require("node-fetch");

let myHeaders = new fetch.Headers();
myHeaders.append('project_id', 'testnetOZvrsaEPH8PLjH9XVVgtzK8TXJYnbvsA');
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');

let requestOption = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const getScriptUtxo = async (req, params) => {
    console.log("TEsting");

    try {
        const api_url = "https://cardano-testnet.blockfrost.io/api/v0/addresses/addr_test1qqdtqvzkl3fd0vrtjy3z40a700s8j0q0q5g9dcucdwmwk5nwy6f7gh2vzugvl7cwyhp5nsmrp4qj7ypf9wku3kc9e2hszrn7n5";
        const fetch_response = await fetch(api_url, requestOption);
        const fetch_json = await fetch_response.json();
        console.log(fetch_json);
    }
    catch (err) {
        console.log("error", err);
    }
};

module.exports = {
    getScriptUtxo
};