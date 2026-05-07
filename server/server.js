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

app.get('/', (req, res) =>{
    res.send('Servidor rodando');
});


app.post('/itens', (req, res) => {
    const { nome } = req.body;

    const sql = 'INSERT INTO itens ( nome ) VALUES (?)';

    db.query(sql, [nome], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erro ao inserir');
        }

        res.send('item adicionado com sucesso');
    })
});


app.get('/itens', (req, res) =>{
    
    const sql = "SELECT * FROM itens";

    db.query(sql, (err, results) => {

        if(err) {
            console.log(err);
            return res.status(500).send('Erro ao buscar itens');
        }

        res.json(results);

    });
});

app.post('/teste', (req, res) =>{
    res.send('Rota funcionando');
});

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

