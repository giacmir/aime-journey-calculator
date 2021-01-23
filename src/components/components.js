import React from 'react';       
import * as Logic from '../functions.js';
import Form from './form';
import Result from './result';


export default class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	onChangeValue(type, ev) {
		return (type, ev) => {
			const values = {...this.state.values};
			values[type] = ev.target.value;
			this.setState({
				values: values
			});
		}
	}

	calculateTime() {
		return Logic.calculateTime({...this.state.values});
	}

	calculateDistance() {
		return Logic.calculateDistance({...this.state.values});
	}

	calculatePeril() {
		return Logic.calculatePeril({...this.state.values});
	}

	calculateJourneyLength() {
		return Logic.calculateJourneyLength({...this.state.values});
	}

	calculateEvents() {
		return Logic.calculateEvents({...this.state.values});
	}

	getInitialState() {
		const localState = window.localStorage.getItem('trip');

		return localState !== null ? JSON.parse(localState): {values: {}};
	}

	componentDidUpdate() {
		window.localStorage.setItem('trip', JSON.stringify(this.state));
	}


	render() {
		return (
			<div className="pure-g">
				<div className="pure-u-3-5">
					<Form terrains={this.props.terrains} values={this.state.values} onChangeValues={this.onChangeValue()}/>
				</div>
				<div className="pure-u-2-5">
					<Result result={this.calculateTime()} label="Travel time"/>
					<Result result={this.calculateDistance()} label="Travel distance"/>
					<Result result={this.calculatePeril()} label="Peril rating"/>
					<Result result={this.calculateJourneyLength()} label="Length"/>
					<Result result={this.calculateEvents()} label="Events number"/>
				</div>
			</div>
		);
	}
}
