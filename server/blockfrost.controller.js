const fetch = require("node-fetch");

let myHeaders = new fetch.Headers();
myHeaders.append('project_id', 'testnetUEYYJPhM1RhYsHGJaruXq2inBiDcvy56');
myHeaders.append('Accept', 'application/json');
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Access-Control-Allow-Origin', '*');

let requestOption = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const getScriptUtxo = async (req, params) => {
    
    try {
        const stake_address = "stake_test1uphzdylyt4xpwyx0lv8zts6fcd3s6sf0zq5jhtwgmvzu4tcekrgmh"
        const address_01 = "addr_test1qqdtqvzkl3fd0vrtjy3z40a700s8j0q0q5g9dcucdwmwk5nwy6f7gh2vzugvl7cwyhp5nsmrp4qj7ypf9wku3kc9e2hszrn7n5"
        const address_02 = "addr_test1qzu3ccl3k4m9e6c9wag009fldnmj2fu8vnggaw8qter7z5hd6ksrht9dann3wpk0qgrme60w779980cvfexa7slg3n0qd4zxj2"
        // const api_url = `https://cardano-testnet.blockfrost.io/api/v0/addresses/${address_02}`
        const api_url = "https://cardano-testnet.blockfrost.io/api/v0/txs/027034b65dc469983761ed071aca90beda2f6a4abebabac80cfdd419161298da#0/redeemers"
        const fetch_response = await fetch(api_url, requestOption);
        const fetch_json = await fetch_response.json();
        console.log(fetch_json);
        console.log("Results are above for the fetch method")
    }
    catch (err) {
        console.log("error", err);
    }
};

getScriptUtxo();

module.exports = {
    getScriptUtxo
};