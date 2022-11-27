require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiroutes = require("./controller/api/");
const docs = require("./controller/api/docs.controller");
const { sequelize } = require("./models");

const app = express();

app.use(express.json({limit: '50mb', extended: true}))
app.use(express.urlencoded({extended:true}));
app.use( cors({ 
    origin: "*", 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
       preflightContinue: false, 
       optionsSuccessStatus: 204, 
       credentials: true, }) );


//DB sync
sequelize.sync({ force: false })
  .then(() => {
    console.log('Successfully connected');
  })
  .catch((err) => {
    console.log('DB Connection err');
    console.error(err);
});

app.get("/",(req,res) => {
    //res.json({message:"hello"});
    res.sendFile(__dirname + '/login_test.html');
});

app.use('/api',apiroutes);
app.use('/docs',docs);

app.set('port', process.env.PORT || 3001);

module.exports = app;