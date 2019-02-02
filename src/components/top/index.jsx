import React from "react";
import "./style.scss";
import Weather from "./weather";
import { Manager, Reference, Popper } from 'react-popper';

export default class TopSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelectLocationOpen: false
		};
	}

	onToggleSelectLocation() {
		this.setState((prevState) => ({ isSelectLocationOpen: !prevState.isSelectLocationOpen }));
	}

	render() {
		const { isSelectLocationOpen } = this.state;
		return (
			<div className="top-container">
				<div className="title">Weather Up</div>
				<Weather {...this.props} />
				
				<Manager>
				    <Reference>
				      {({ ref }) => (
				        <button className="btn btn-select-location" ref={ref} onClick={this.onToggleSelectLocation.bind(this)}>
				        	Select Location
				        </button>
				      )}
				    </Reference>
				    <Popper placement="top">
				      {({ ref, style, placement, arrowProps }) => ( isSelectLocationOpen && (
				        <div className="popup-container" ref={ref} style={style} data-placement={placement}>
				          <div className="form-container">
				          	<label htmlFor="location-name">Location Name</label>
				          	<input id="location-name" type="text" placeholder="City Name"/>
				          	<button className="btn btn-select-location">Select</button>
				          </div>
				          <div ref={arrowProps.ref} style={arrowProps.style} />
				        </div>
				      ))}
				    </Popper>
				</Manager>
			</div>
		);
	}
}