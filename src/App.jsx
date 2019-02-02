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
      forcastDays: 5, 
      isLoading: true
    };
  }

  componentDidMount() {
    const { cityName, forcastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${forcastDays}`;

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
        iconURL: data.current.condition.icon
      });
    }).catch((err) => {
      if(err) console.log('Cannot fetch Weather Data from API, ', err);
    });
  }

  render() {
    const { isLoading, cityName, temp_c, isDay, text, iconURL } = this.state;
    return (
      <div className="app-container">
      	  	<div className="main-container">
              {isLoading && <h3>Loading Weather...</h3>}
              {!isLoading && (
                <div className="top-section">
                  <TopSection location={cityName} temp_c={temp_c} isday={isDay} text={text} iconurl={iconURL} />
                </div>
              )}
      			<div className="bottom-section">
      	  			<BottomSection />
      			</div>
      		</div>
      </div>
    );
  }
}

export default App;
