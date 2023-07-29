const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
const todoRouter = require('./routes/to-do');



const dbURI="mongodb+srv://Priyanshu:SvoQPok3esdBeFRx@nodeblogs.7lcrt7b.mongodb.net/to-do?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/to-do', todoRouter);


if(process.env.NODE_ENV=='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
