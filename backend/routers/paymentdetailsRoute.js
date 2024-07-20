const express = require('express');
// In orderformRoute.js
const Payment = require('../model/PaymentDetails/paymentdetailsModel');


// Create a new router object to handle routes
const router = express.Router();

// POST route for creating a new order
router.post("/", async (request, response, next) => {
    try {
      // Check if all required fields are present in the request body
      if (
        !request.body.cardholdername ||
        !request.body.cardnumber ||
        !request.body.expirydate ||
        !request.body. cvv 
        
        

      ) {
        return response.status(400).send({
          message: "send all required fields: cardholdername, cardnumberne, expirydate, cvv",
        });
      }

      const newPayment= {
        cardholdername: request.body. cardholdername,
        cardnumber: request.body.cardnumber,
        expirydate: request.body.expirydate,
        cvv: request.body.cvv,
        
        
      };
  
      const payment = await Payment.create(newPayment);
  
      return response.status(201).send(payment);
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
    
  });


  // Export the router to be used in other parts of the application
module.exports = router;