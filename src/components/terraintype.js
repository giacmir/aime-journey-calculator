import React from 'react';       

export default function TerrainType(props) {
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
