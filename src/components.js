import React from 'react';       
import * as Logic from './functions.js'

function TerrainType(props) {
	return (
		<div>
			<div className="terrain-color terrain-{props.color}" style={{backgroundColor: props.color}}></div>
				<label>
					{props.name}	
					<input type="number" value={props.value} onChange={props.onChangeCallback}/>
			</label>
		</div>
	);
}

class Form extends React.Component {
	render() {
		return (
			<form className="pure-form-stacked pure-form">
			{this.props.terrains.map((terrain, i) => {
				return (
					<TerrainType key={terrain.name} color={terrain.color} name={terrain.name} 
					value={this.props.values[terrain.name] || 0} onChangeCallback={((ev) => {this.props.onChangeValues(terrain.name, ev)})} defaultValue="0"/>
				);
			})}
			</form>
		);
	}
}

function Result(props) {
	return (
		<div>
			<p>{props.label}</p>
			<h2>{props.result}</h2>
		</div>
	);
}

export default class Calculator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			values: {
			}
		}
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
