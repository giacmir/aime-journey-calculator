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
						value={this.props.values[terrain.name]} onChangeCallback={((ev) => {this.props.onChangeValues(terrain.name, ev)})}/>
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
				Easy: 2,
				Daunting: 8
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

	calculateResult() {
		let result = 0;
		getTerrains().map((terrain, i) => {
			result += parseInt(this.state.values[terrain.name])
			return true;
		});

		return result;
	}

	render() {
		return (
			<div>
				<Form terrains={this.props.terrains} values={this.state.values} onChangeValues={this.onChangeValue()}/>
				<Result result={this.calculateResult()}/>
			</div>
		);
	}
}

function getTerrains() {
	return [
		{
			name: 'Easy',
			color: 'lightgreen'
		},
		{
			name: 'Daunting',
			color: 'red'
		}
	]
}

ReactDOM.render(
	<Calculator terrains={getTerrains()}/>,
	document.getElementById('root')
)

