import React from 'react';       
import * as Logic from './functions.js'

function TerrainType(props) {
	return (
		<div>
			<div className="color-square">{props.color}</div>
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
			<div>
			{this.props.terrains.map((terrain, i) => {
				return (
					<TerrainType key={terrain.name} color={terrain.color} name={terrain.name} 
					value={this.props.values[terrain.name] || 0} onChangeCallback={((ev) => {this.props.onChangeValues(terrain.name, ev)})} defaultValue="0"/>
				);
			})}
			</div>
		);
	}
}

function Result(props) {
	return (
		<div>
			<p>{props.label}</p>
			<h1>{props.result}</h1>
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


	render() {
		return (
			<div>
				<Form terrains={this.props.terrains} values={this.state.values} onChangeValues={this.onChangeValue()}/>
				<Result result={this.calculateTime()} label="Travel time"/>
				<Result result={this.calculateDistance()} label="Travel distance"/>
				<Result result={this.calculatePeril()} label="Peril rating"/>
			</div>
		);
	}
}
