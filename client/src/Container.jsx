import React, { Component } from 'react'
import Weather from './Weather.jsx';
import {
    Navbar,
    NavbarBrand,
    Row,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    Button,
    FormGroup,
    Input,
    Col
  } from 'reactstrap';
  
class Container extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
         weather: null,
         cityList: [],
         newCityName: ''
      };
    }
  
    getCityList = () => {
      fetch('http://localhost:5000/api/cities')
      .then(res => res.json())
      .then(res => {
        var cityList = res.map(r => r.city_name);
        console.log(cityList)
        this.setState({ cityList });
      });
    };
  
    handleInputChange = (e) => {
      this.setState({ newCityName: e.target.value });
    };
  
    handleAddCity = () => {
      fetch('http://localhost:5000/api/cities', {
        method: 'post',
        headers: { 'Content-Type': 'Containerlication/json' },
        body: JSON.stringify({ city: this.state.newCityName })
      })
      .then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      });
    };
  
    getWeather = (city) => {
      fetch(`http://localhost:5000/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
      });
    }
  
    handleChangeCity = (e) => {
      this.getWeather(e.target.value);
    }
  
    componentDidMount () {
      this.getCityList();
    }
  
    render() {
      return (
        <div className="container-fluid" fluid className="centered">
          <Navbar bg="dark" variant="dark">
            <NavbarBrand>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/81%2BeUvsHXoL.png"
                width="30"
                height="30"
                />{' '}
                Weather Container
            </NavbarBrand>
          </Navbar>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Weather Container </h1>
                <p className="lead">The current weather for any city you need in the world!</p>
                <InputGroup>
                  <Input 
                    placeholder="New city name to add..."
                    value={this.state.newCityName}
                    onChange={this.handleInputChange}
                    width="10vw"
                  />
                  <InputGroupAddon addonType="Containerend">
                    <Button variant="danger" onClick={this.handleAddCity}>Add</Button>
                  </InputGroupAddon>
                  
                </InputGroup>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="display-5">Current Weather</h1>
              <FormGroup>
                <Input type="select" onChange={this.handleChangeCity}>
                  { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                  { this.state.cityList.length > 0 && <option>Select a city.</option> }
                  { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Weather data={this.state.weather}/>
        </div>
      );
    }
  }
  
  export default Container;
  
  