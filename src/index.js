import ReactDOM from 'react-dom';
import Calculator from './components/calculator.js';
import * as Constants from './constants.js';
import './index.css';


ReactDOM.render(
	<Calculator terrains={Constants.terrains}/>,
	document.getElementById('root')
)

