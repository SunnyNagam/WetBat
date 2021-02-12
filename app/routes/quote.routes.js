module.exports = app => {
    const quotes = require("../controllers/quote.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Quote
    router.post("/", quotes.create);
  
    // Get all quotes
    router.get("/", quotes.findAll);
  
    // Delete a Quote with id
    router.delete("/:id", quotes.delete);
  
    app.use('/api/quotes', router);
  };