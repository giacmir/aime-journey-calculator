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
	const result = countHexes(values);

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

export function calculateJourneyLength(values) {
	const hexes = countHexes(values);
	let result;

	if (hexes <= 15) {
		result = 'Short';
	}
	else if (hexes <= 40) {
		result = "Medium";
	}
	else {
		result = "Long";
	}

	return result + " Journey";
}
 export function calculateEvents(values) {
	 const hexes = countHexes(values);
	 let result;
	 let formula;

	if (hexes <= 15) {
		result = throwDice(2, 0);
		formula = "1d2";
	}
	else if (hexes <= 40) {
		result = throwDice(2, 1);
		formula = "1d2+1"
	}
	else {
		result = throwDice(3, 2);
		formula = "1d3+2"
	}
	  return `${result} (${formula})`;
 }

function countHexes(values) {
	let result = 0;
	Constants.terrains.map((terrain, i) => {
		result += parseInt(values[terrain.name] || 0)
		return true;
	});

	return result;
}

function throwDice(sides, modifier) {
	const diceroll =  Math.floor(Math.random() * (sides)) + 1
	return diceroll + parseInt(modifier);
}
