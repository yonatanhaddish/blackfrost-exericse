const express = require("express");
const app = express();

function runExample () {
    app.listen(3001, () => {
        console.log("Server Running!");
    });
};

runExample();

