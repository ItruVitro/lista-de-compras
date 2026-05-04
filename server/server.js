const express = require('express');
const mysql = require("mysql2");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '524079',
    database: 'lista_db'
});

db.connect(err => {
    if(err){
        console.log('Erro ao conectar:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});



