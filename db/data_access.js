require('dotenv').config();
const mysql = require('mysql2');
const client = mysql.createConnection(process.env.DATABASE_URL);
client.connect();

const getAllPlayers = () => new Promise((resolve, reject) => {
    console.log('FETCHING DATA..');
    client.query(`select * from Players`, (err, res) => {
        if (err) {
            reject(err);
            throw console.error(' *** ERROR *** :' + JSON.stringify(err));
        } else {
            console.log('GETTING DATA ', res);
            //console.log(' $$$$$$    GETTING $$$$$$ (' + JSON.stringify(res) + ') OF THE DATA :');
            //console.log('RES DOPO GETTIN DATA ... ', res);
            // prod resolve(res[0]);
            resolve(res);
        }
        client.end;
    })
});

const updateData = (value) => new Promise((resolve, reject) => {
    client.query(`UPDATE Players SET count = ${value[0]} WHERE id = ${value[1]}`, value, (err, res) => {
        if (err) {
            reject(err);
            throw console.error('ERROR :' + JSON.stringify(err));
        } else {
            let player = res.affectedRows;
            console.log('UPDATING THE DATA :' + JSON.stringify(res));
            resolve(player);
        }
        client.end;

    })
});
module.exports = { getAllPlayers, updateData };
