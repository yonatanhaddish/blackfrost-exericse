const BlockfrostController = require("./blockfrost.controller");

module.exports = function (app) {
    app.get('/', BlockfrostController.getScriptUtxo);
};