import React from 'react';

// React-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Landingpage from './components/Landingpage'
import Moviedetails from './components/Moviedetails'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Router>
					<Route path='/' exact component={Landingpage} />
					<Route path='/moviedetails/:id' render={(props) => <Moviedetails {...props}/>} />
				</Router>
			</div>
		);
	}
}

export default App;
