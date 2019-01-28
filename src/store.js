import React from "react";

export default class Store extends React.Component {

	constructor(props) {
		super(props);
		// Main App State
		this.state = {
			appName: "Weather Up"
		}
	}

	render() {
		return React.children.map(this.props.children, (child) => {
			return React.cloneElement()
		});
	}

}