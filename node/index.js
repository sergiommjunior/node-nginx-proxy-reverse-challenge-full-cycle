const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const insertName = async (nome) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('${nome}')`
    connection.query(sql)
    connection.end()
}

const consultNames = async (res) => {
    let page = '<h1>Full Cycle Rocks!</h1>'
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    const sql = `SELECT * FROM people WHERE id=1`
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                mysql.end();
                res.send(`<h1>${error}</h1>`);
            }
            if (results.length > 0) {
                console.log(results);
                results.forEach(element => {
                    page += `\n<h1>nome: ${element['name']}</h1>`
                });
                res.send(page)
            }
        }
    )
    connection.end()
}


app.get('/', async (req, res) => {
    await insertName('Sergio')
    await consultNames(res)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})