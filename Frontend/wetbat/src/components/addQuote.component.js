import React, { Component } from "react";
import QuoteDataService from "../services/quote.service";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
    this.newQuote = this.newQuote.bind(this);

    this.state = {
      id: null,
      departLoc: "",
      arriveLoc: "",
      departDate: null,
      arriveDate: null,
      transport: "",
      travelerCount: null,
      contactEmail: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  saveQuote(event) {
    QuoteDataService.create(this.state)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    this.newQuote();
  }

  newQuote() {
    this.setState({
        id: null,
        departLoc: "",
        arriveLoc: "",
        departDate: null,
        arriveDate: null,
        transport: "",
        travelerCount: null,
        contactEmail: ""
    });
  }

  render() {
    return (
      <Form onSubmit={this.saveQuote}>

        <Form.Group controlId="departLoc">
          <Form.Label>Depart From</Form.Label>
          <Form.Control type="text" name="departLoc" onChange={this.handleChange} placeholder="Calgary" />
        </Form.Group>

        <Form.Group controlId="arriveLoc">
          <Form.Label>Arrive To</Form.Label>
          <Form.Control type="text" name="arriveLoc" onChange={this.handleChange} placeholder="Toronto" />
        </Form.Group>

        <Form.Group controlId="departDate">
          <Form.Label>Departure Date</Form.Label>
          <Form.Control type="text" name="departDate" onChange={this.handleChange} placeholder="2021-08-01" />
        </Form.Group>

        <Form.Group controlId="arriveDate">
          <Form.Label>Arrival Date</Form.Label>
          <Form.Control type="text" name="arriveDate" onChange={this.handleChange} placeholder="2021-09-12" />
        </Form.Group>

        <Form.Group controlId="transport">
          <Form.Label>Transport Method</Form.Label>
          <Form.Control as="select" name="transport" onChange={this.handleChange}>
            <option>Plane</option>
            <option>Train</option>
            <option>Automobile</option>
            <option>Boat</option>
            <option>Zipline</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="travelerCount">
          <Form.Label>Passengers (max: 5)</Form.Label>
          <Form.Control as="select" name="travelerCount" onChange={this.handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="contactEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="contactEmail" onChange={this.handleChange} placeholder="Enter email" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
    );
  }
}