import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./sass/app.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
      	  	<div className="main-container">
      	  		<div className="top-section">
      	  			TOP
      			</div>
      			<div className="bottom-section">
      	  			BOTTOM
      			</div>
      		</div>
      </div>
    );
  }
}

export default App;
