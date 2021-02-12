const db = require("../models");
const Quote = db.quote;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(">>>Recieved create request");

    const quote = {
      departLoc: req.body.departLoc,
      arriveLoc: req.body.arriveLoc,
      departDate: req.body.departDate,
      arriveDate: req.body.arriveDate,
      transport: req.body.transport,
      travelerCount: req.body.travelerCount,
      contactEmail: req.body.contactEmail
    };
  
    Quote.create(quote)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Quote."
        });
      });
};

exports.findAll = (req, res) => {
  console.log(">>>Recieved get all request");
  Quote.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving quotes."
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Quote.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Quote was deleted!"
          });
        } else {
          res.send({
            message: `Quote was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Quote with id=" + id
        });
      });
};