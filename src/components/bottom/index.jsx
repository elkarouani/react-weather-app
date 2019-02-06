import React from "react";
import "./style.scss";
import Forcastday from "./forcastday";

export default class BottomSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { forecastdays } = this.props;
		console.log(forecastdays);
		return (
			<div className="bottom-container">
				<div className="inner-container">
					{forecastdays && forecastdays.map((forecastday, index) => {
						return (<Forcastday day={forecastday.day} key={index} />) ;
					})}
				</div>
			</div>
		);
	}
}