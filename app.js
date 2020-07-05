const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
//app.use(cors());


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://parth123:parth123@cluster0.yjojy.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Connect to Db! Hurray!!')
//   client.close();
// });
// mongoose.connect('mongodb+srv://parth123:parth123@cluster0.yjojy.mongodb.net/Director?retryWrites=true&w=majority' , {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
//   useUnifiedTopology: true
// })
// .then(()=> {
// 	console.log("Connected to DB! Hurray");
// }).catch(err => {
// 	console.log("ERROR:", err.message);
// })

// mongoose.connect('mongodb+srv://parth123:parth123@cluster0.yjojy.mongodb.net/test?retryWrites=true&w=majority');
// mongoose.connection.once('open', ()=>{
//   console.log('connect to database');
// })
//
//
//
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://parth123:parth123@cluster0.yjojy.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql:true
// }));


const port = process.env.Port || 4000;
app.listen(port, ()=>{
  console.log('Now listening to Request on the chosen port');
})
