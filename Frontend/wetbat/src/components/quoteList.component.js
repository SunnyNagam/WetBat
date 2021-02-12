import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import QuoteDataService from "../services/quote.service";

export default class QuotesList extends Component {
  
  constructor(props) {
    super(props);
    this.retrieveQuotes = this.retrieveQuotes.bind(this);
    this.getCityImages = this.getCityImages.bind(this);

    this.state = {
      quotes: [],
      images: [],
      currentQuote: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveQuotes();
  }

  // This method automatically generates images for the cards based on the destination city
  // It uses a regestered google places API, normally the key would be hidden in the .env file which
  // should be added to the .gitignore for security, but to simplify build instructions it is not ignored.
  getCityImages() {
    let newImages = [];
    let numImages = this.state.quotes.length;

    this.state.quotes.forEach(quote =>{
      console.log(quote);
      // Routing through this heroku app is a quick workaround to get the frontend to make external requests
      // without cors getting angry. For a more proper project, the frontend should trigger the backend to make
      // the external request and serve the image.
      const cors_redirect_url = 'https://secret-beyond-01067.herokuapp.com/';
      const mapsSearchQuery = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+quote.arriveLoc+' city&key='+process.env.REACT_APP_PLACES_API_KEY+'&inputtype=textquery&fields=name,photos';
      
      axios.get(cors_redirect_url+mapsSearchQuery)
          .then(response => {
            console.log(response);
            const photo_reference = response.data.candidates[0].photos[0].photo_reference;
            const mapsImageQuery = 'https://maps.googleapis.com/maps/api/place/photo?photoreference='+photo_reference+'&key='+process.env.REACT_APP_PLACES_API_KEY+'&maxwidth=600&maxheight=400';

            axios.get(cors_redirect_url + mapsImageQuery, {responseType: 'blob'})
              .then(response => {
                console.log(response);
                const imageURL = URL.createObjectURL(response.data);
                newImages.push(imageURL);
                if(newImages.length == numImages){
                  this.setState({
                    images: newImages
                  });
                }
              });
          });
    });
  }
  
  retrieveQuotes() {
    QuoteDataService.getAll()
      .then(response => {
        this.setState({
          quotes: response.data
        }, () => this.getCityImages());
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, quotes, currentQuote, currentIndex } = this.state;

    return (
      <div className="list row">
          {quotes && quotes.map((quote, index) => (
            <Card bg={'Primary'} key={index} style={{ margin: '20px', width: '20vw'}}>
              
              <Card.Img variant="top" src={this.state.images[index]} height='300px' width='100%' object-fit='cover'/>
              
              <Card.Header bg={'Primary'}>
                <Card.Title>{quote.departLoc} to {quote.arriveLoc}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Departs {quote.departDate.substring(0,10)}</Card.Subtitle>
              </Card.Header>
              
              <Card.Body>
                <p><b>From: </b>{quote.departLoc}</p>
                <p><b>To: </b>{quote.arriveLoc}</p>
                <p><b>Depart Time: </b>{quote.departDate.substring(0,10)}</p>
                <p><b>Arrival Time: </b>{quote.arriveDate.substring(0,10)}</p>
                <p><b>Number of Passengers: </b>{quote.travelerCount}</p>
                <p><b>Travel Method: </b>{quote.transport}</p>
                <p><b>Contact: </b>{quote.contactEmail}</p>
              </Card.Body>
              
              <Card.Footer>
                <small className="text-muted">Quote ID: {quote.id} Created: {quote.createdAt.substring(0,10)}</small>
              </Card.Footer>

            </Card>
          ))}
      </div>
    );
  }
}