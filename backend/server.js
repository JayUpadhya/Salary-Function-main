const express = require('express');
const app = express(); //app -express instance
const cors = require('cors');
const port = 3001;
const host = 'localhost';  // can use http://localhost also
const mongoose = require('mongoose');


const salaryRouter = require('./routers/salaryRoute');
const orderformRouter = require('./routers/orderformRoute');
const paymentRouter = require('./routers/paymentdetailsRoute');
const memployeeRouter = require('./routers/MEmployeesRoute');



app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/salaryDB';

const connect = async () => {
     try { 
          await mongoose.connect(uri);
          console.log('Connected to MongoDB');
     }
     catch(error){
          console.log('MongoDB Error: ', error);

     }
};

connect();

//create server to run node js
const server = app.listen(port, host, () =>{
     console.log(`Node server is listening to ${server.address().port}`)
}); 


app.use('/api/salary', salaryRouter);
app.use('/api/order', orderformRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/memployee', memployeeRouter);
 