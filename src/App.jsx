import React, { Component } from 'react';
import './App.css';
import "./sass/app.scss";
import TopSection from "./components/top/index.jsx";
import BottomSection from "./components/bottom/index.jsx";
import axios from "axios";

const WEATHER_KEY = "e09586f0a20a4793aef210057192801";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Marrakech",
      numforcastDays: 4, 
      isLoading: true
    };
  }

  updateWeather() {
    const { cityName, numforcastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${numforcastDays}`;

    axios
    .get(URL)
    .then((res) => {
      return res.data;
    }).then((data) => {
      this.setState({
        isLoading: false,
        temp_c: data.current.temp_c,
        isDay: data.current.is_day,
        text: data.current.condition.text,
        iconURL: data.current.condition.icon,
        forecastdays: data.forecast.forecastday
      });
    }).catch((err) => {
      if(err) console.log('Cannot fetch Weather Data from API, ', err);
    });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      this.setState({ cityName: data }, () => this.updateWeather());
      // console.log("locationName: ", data);
    })
  }

  render() {
    const { isLoading, cityName, temp_c, isDay, text, iconURL, forecastdays } = this.state;
    return (
      <div className="app-container">
      	  	<div className="main-container">
              {isLoading && <h3>Loading Weather...</h3>}
              {!isLoading && (
                <div className="top-section">
                  <TopSection location={cityName} temp_c={temp_c} isday={isDay} text={text} iconurl={iconURL} eventEmitter={this.props.eventEmitter}/>
                </div>
              )}
      			<div className="bottom-section">
      	  			<BottomSection forecastdays={forecastdays}/>
      			</div>
      		</div>
      </div>
    );
  }
}

export default App;
