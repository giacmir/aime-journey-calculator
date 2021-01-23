import React from 'react';
import TerrainType from './terraintype';

export default class Form extends React.Component {
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
