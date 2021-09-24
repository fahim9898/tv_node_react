require('dotenv').config();

const express = require('express');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes')

const mongoose = require('mongoose');

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const adminUser = require('./models/adminUser');
const user = require('./models/user');

app.use('/api', routes);

(async function () {
  mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
      console.log('Connected to Mongo');
      const port = 3005;
      console.log("Server is running on port", port);
      app.listen(port)

    })
    .catch(err=>{
      console.log('Error: ',err)
    })
})()


