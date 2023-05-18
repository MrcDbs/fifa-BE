require('dotenv').config();
const express = require('express');

const app = express();

const connection = require('../db/data_access');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require('cors');


var corsOptions = {
    origin: 'https://mrcdbs.github.io',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

const BASE_PATH = '/fifa';

app.get(BASE_PATH + '/getPlayers', async (req, res) => {
    let players = await connection.getAllPlayers();
    if (players && players !== undefined) {
        res.status(200).json(players);
    } else {
        res.status(404);
    }

});

app.patch(BASE_PATH + '/setCount/:id/:count', async (req, res) => {
    const params = [req.params.count, req.params.id];
    if (params && params.length > 0) {
        const player = await connection.updateData(params);
        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404);
        }
    }

});

app.listen(3210);

