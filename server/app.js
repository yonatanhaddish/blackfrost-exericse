const express = require('express');
app = express();

require('dotenv').config()

app.use('/', require("./routes/indexRoutes"));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});