var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM user';

var con = mysql.createConnection({
  host: "localhost",
  user: "okanbk",
  password: "asdqwe123",
  database: "product",
  port : "8889"
});


con.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('/user sayfasina git')
});

app.get('/user', (req, res) => {
  con.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    }else{
      return res.json({
        data: results
      })
    }
  });
});
 

app.post('/user/add', (req, res) => {
  const {name, surname, username, password, age, text} = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO user (name, surname, username, password, age, text) VALUES('${name}', '${surname}', '${username}', '${password}', '${age}', '${text}')`;
  con.query(INSERT_PRODUCTS_QUERY, (err, results) =>{
    if (err) {
      return res.send(err);
    }else{
      return res.send('Yeni Kullanici Eklendi')
    }
  });
});



app.get('/user/update', (req, res) => {
  const {data, newData, id} = req.query;
  const UPDATE_PRODUCTS_QUERY = `UPDATE user SET ${data}=('${newData}') WHERE id=('${id}')`;
  con.query(UPDATE_PRODUCTS_QUERY, (err, results) =>{
    if (err) {
      return res.send(err);
    }else{
      return res.send('Kullanici Guncellendi')
    }
  });
});



app.get('/user/delete', (req, res) => {
  const {data, rmData} = req.query;
  const DELETE_PRODUCTS_QUERY = `DELETE FROM user WHERE ${data}=('${rmData}')`;
  con.query(DELETE_PRODUCTS_QUERY, (err, results) =>{
    if (err) {
      return res.send(err);
    }else{
      return res.send('Kullanici Silindi')
    }
  });
});


 
app.listen(4000,  () => {
  console.log('TAMAM TAMAMM')
});
