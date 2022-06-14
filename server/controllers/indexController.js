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

const getScriptsUtxos = async (req, res) => {
    const address01 = "addr_test1qq0g3uwkr8k84jm7e0l3w0nkuekkprz0ajt6z6u3mn7s9wmwy6f7gh2vzugvl7cwyhp5nsmrp4qj7ypf9wku3kc9e2hslewrzf"
    const scriptAddress = "addr_test1qprzqdpl65f8tv08dx8h4dwdkq2dnepe7evsr265027034b65dc469983761ed071aca90beda2f6a4abebabac80cfdd419161298da#0l0vh3ahd6ksrht9dann3wpk0qgrme60w779980cvfexa7slg3n0qldhs7k"
    const scriptHash = "7177f6f960711409c8f47b0a9a8cc280d2d03850f8f80343a7e36248000e3dc9#0"
    const transactionId = "027034b65dc469983761ed071aca90beda2f6a4abebabac80cfdd419161298da";

    try {
        const api_url = `https://cardano-testnet.blockfrost.io/api/v0/txs/${transactionId}`;
        
        const fetch_response = await fetch(api_url, requestOptions);
        const fetch_json = await fetch_response.json();
        // res.json("halo");
        return res.json({Utxos: fetch_json});
    }
    catch (err) {
        return res.status(500).json({error: err.message});
    }  
};



module.exports = { getScriptsUtxos };




// const functionOneTest = (req, res) => {
//     res.json("Hello Yoni!");
// };

// module.exports = { functionOneTest };