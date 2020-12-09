import * as Constants from './constants.js';

export function calculateTime(values) {
	let result = 0;
	Constants.terrains.map((terrain, i) => {
		result += parseInt(values[terrain.name] || 0) * terrain.modifier
		return true;
	});

	result = Math.round(result / 2);

	return result + " days";
}

export function calculateDistance(values) {
	let result = 0;
	Constants.terrains.map((terrain, i) => {
		result += parseInt(values[terrain.name] || 0)
		return true;
	});

	return result * 10 + " miles";
}

export function calculatePeril(values) {
	const valueArray = Constants.terrains.map((item, i) => {
		return parseInt(values[item.name]) || 0;
	});
	const maxValue = Math.max.apply(null, valueArray);

	let maxTerrain = false;
	Constants.terrains.forEach((item) => {
		if (parseInt(values[item.name]) === maxValue) {
			maxTerrain = item;
		}
	});

	if (maxTerrain !== false) {
		return `${maxTerrain.peril} (${maxTerrain.name})`;
	}
	return '';
}
