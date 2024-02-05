const express = require('express')
const app = express()
const port = 3000

app.get('/servers/list', (req, res) => {
    (async () => {
        const response = await fetch("https://www.vpngate.net/api/iphone/");
        const data = await response.text();
        res.send({ data: csvToJson(data) })
    })();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function csvToJson(csv) {
    const lines = csv.split("\n").slice(2);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentLine = lines[i].split(",");
        obj.ip = currentLine[1];
        obj.ping = currentLine[3];
        obj.speed = currentLine[4];
        obj.country = currentLine[5];

        if (currentLine[0].includes('public')) {
            result.push(obj);
        }
    }

    return result;
}