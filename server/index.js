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
        const address = await API.addresses(
            "addr_test1qqdtqvzkl3fd0vrtjy3z40a700s8j0q0q5g9dcucdwmwk5nwy6f7gh2vzugvl7cwyhp5nsmrp4qj7ypf9wku3kc9e2hszrn7n5"
            );
        const pools = await API.pools({
            page: 1,
            count: 10,
            order: "asc"
        });

        // console.log("latestBlock", latestBlock);
        // console.log("networkInfo", networkInfo);
        // console.log("latestEpoch", latestEpoch);
        // console.log("health", health);
        console.log("address", address);
        // console.log("pools", pools);
    }
    catch (err) {
        console.log("error", err);
    }
    
}


runExample02();

