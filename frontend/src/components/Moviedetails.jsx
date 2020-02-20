import React from 'react';

// Axios
import Axios from 'axios';

// Material-UI
import { IconButton } from '@material-ui/core/';
import HomeIcon from '@material-ui/icons/Home';

class Moviedetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieArray: []
		};
	}

	componentDidMount = () => {
		let matchId = this.props.match.params.id;
		Axios.get(
			`https://api.themoviedb.org/3/movie/${matchId}?api_key=f7304a4e29a411a4c5676db97e0a3296&language=en-US&page=1`
		).then((res) => {
			console.log([res.data]);
			this.setState({
				movieArray: [res.data]
			});
		});
	};

	render() {
		const { movieArray } = this.state;
		return (
			<div>
				<nav className="navbar shadow navbar-light bg-light">
					<form className="form-inline">
						<div className="input-group">Moviedetails</div>
					</form>
					<IconButton edge="start" style={{ color: '#4A4A4A' }} aria-label="menu" href="/">
						<HomeIcon />
					</IconButton>
				</nav>
				{movieArray.map((e) => {
					return (
						<div className="card mb-3" key={e.id}>
							<div className="row no-gutters">
								<div className="col-md-4">
									<img
										src={`http://image.tmdb.org/t/p/w500${e.poster_path}`}
										className="img-thumbnail"
                                        alt={e.tagline}
									/>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h5 className="card-title">{e.title} <span style={{color : '#9B9B9B'}}>({e.popularity})</span></h5>
										<p className="card-text">
											<small className="text-muted">
												{e.release_date.slice(0,4)} | {e.runtime}
											</small>
										</p>
										<p className="card-text">Description: {e.overview}</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Moviedetails;
