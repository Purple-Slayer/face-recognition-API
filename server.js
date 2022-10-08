//https://evening-depths-32865.herokuapp.com/
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const Port = 4000;



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'purple',
    password : 'purple',
    database : 'smart-brain'
  }
});


db.select('*').from('users')
    .then(data => {
      
    });


const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => { res.send("it's working") });
app.post('/signin', (req, res) => {signin.handleSignin(db, bcrypt, req, res)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});    
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



app.listen(Port , () => {
console.log(`app is running on port ${Port}`);
});
