const { Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Quote = sequelize.define("quote", {
      departLoc: {
        type: Sequelize.STRING
      },
      arriveLoc: {
        type: Sequelize.STRING
      },
      departDate: {
        type: Sequelize.DATE
      },
      arriveDate: {
        type: Sequelize.DATE
      },
      transport: {
        type: Sequelize.STRING
      },
      travelerCount: {
        type: Sequelize.INTEGER
      },
      contactEmail: {
        type: Sequelize.STRING
      }
    });
  
    return Quote;
  };