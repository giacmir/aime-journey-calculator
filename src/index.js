import React from 'react';       
import ReactDOM from 'react-dom';
import './index.css';

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

class Result extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.label}</p>
				<h1>{this.props.result}</h1>
			</div>
		);
	}
}

class Calculator extends React.Component {
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
		let result = 0;
		getTerrains().map((terrain, i) => {
			result += parseInt(this.state.values[terrain.name] || 0) * terrain.modifier
			return true;
		});

		result = Math.round(result / 2);

		return result + " days";
	}

	calculateDistance() {
		let result = 0;
		getTerrains().map((terrain, i) => {
			result += parseInt(this.state.values[terrain.name] || 0)
			return true;
		});

		return result * 10 + " miles";
	}

	calculatePeril() {
		const values = {...this.state.values};
		const valueArray = getTerrains().map((item, i) => {
			return parseInt(values[item.name]) || 0;
		});
		const maxValue = Math.max.apply(null, valueArray);

		let maxTerrain = false;
		getTerrains().forEach((item) => {
			if (parseInt(values[item.name]) === maxValue) {
				maxTerrain = item;
			}
		});

		if (maxTerrain !== false) {
			return `${maxTerrain.peril} (${maxTerrain.name})`;
		}
		return '';
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

function getTerrains() {
	return [
		{
			name: 'Very Easy',
			color: 'white',
			modifier: 0.5,
			peril: 0
		},
		{
			name: 'Easy',
			color: 'lightgreen',
			modifier: 1,
			peril: 1
		},
		{
			name: 'Moderate',
			color: 'green',
			modifier: 1.5,
			peril: 2
		},
		{
			name: 'Hard',
			color: 'orange',
			modifier: 2,
			peril: 3
		},
		{
			name: 'Severe',
			color: 'purple',
			modifier: 3,
			peril: 4
		},
		{
			name: 'Daunting',
			color: 'red',
			modifier: 5,
			peril: 5
		}
	]
}

ReactDOM.render(
	<Calculator terrains={getTerrains()}/>,
	document.getElementById('root')
)

