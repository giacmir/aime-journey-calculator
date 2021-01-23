import React from 'react';

export default function Result(props) {
	return (
		<div>
			<p>{props.label}</p>
			<h2>{props.result}</h2>
		</div>
	);
}
