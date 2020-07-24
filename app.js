const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());



const PORT = process.env.PORT || 5000;
const databaseUri = process.env.MONGODB_URI;
mongoose.connect(databaseUri , {
	useNewUrlParser: true,
	useCreateIndex: true,
  useUnifiedTopology: true
})
.then(()=> {
	console.log("Connected to DB! Hurray");
	//return server.listen({port: PORT});
}).catch(err => {
	console.log("ERROR:", err.message);
})




app.use('/', graphqlHTTP({
    schema,
    graphiql:true
}));


//const port = process.env.Port || 4000;
app.listen(PORT, ()=>{
  console.log(`Now listening to Request on the chosen ${PORT}`);
})
