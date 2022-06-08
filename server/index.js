const express = require("express");
const Blockfrost = require("@blockfrost/blockfrost-js");
const app = express();
const API = new Blockfrost.BlockFrostAPI({
    projectId: "testnetOZvrsaEPH8PLjH9XVVgtzK8TXJYnbvsA",
});


function runExample01 () {
    app.listen(3001, () => {
        console.log("Server Running!");
    });
};

async function runExample02() {
    try {
        const latestBlock = await API.blocksLatest();
        const networkInfo = await API.network();
        const latestEpoch = await API.epochsLatest();
        const health = await API.health();

        console.log("latestBlock", latestEpoch);
    }
    catch (err) {
        console.log("error", err);
    }
    
}


runExample02();



