const express = require('express');
app = express();

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('hello again and again')
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});