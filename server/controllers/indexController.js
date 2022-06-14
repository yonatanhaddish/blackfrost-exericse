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

const getScriptsUtxos = (req, res) => {
    res.send("Testing");
};

module.exports = { getScriptsUtxos };




// const functionOneTest = (req, res) => {
//     res.json("Hello Yoni!");
// };

// module.exports = { functionOneTest };