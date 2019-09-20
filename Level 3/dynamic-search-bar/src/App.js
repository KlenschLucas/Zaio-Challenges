import React, { Component } from 'react'
import { Container, InputGroup, FormControl, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locations: [
        "Durban,SA", "Cape Town,SA", "PE,SA", "Johannesburg,SA", "Pretoria,SA",
        "Delhi,India", "Gujarat,India", "Big Ben,UK", "California,USA",
        "London,UK"],
      suggestions: null
    }
  }
  render() {
    const search = (e) => {
      this.setState({
        search: e.target.value
      });
    }
    const select = (location) => {
      this.setState({search: location});
    }
    return (
      <Container>
        <br />
        <InputGroup size="lg">
          <FormControl aria-label="Large" onChange={e => search(e)}
            aria-describedby="inputGroup-sizing-sm" value={this.state.search} />
        </InputGroup>
        {this.state.locations.filter(item => item.includes(this.state.search)).map(location => (
          <Card onClick={() => select(location)} key={location}>
            <Card.Body>
              {location}
            </Card.Body>
          </Card>
        ))}
        <br />
      </Container>
    );
  }
}

