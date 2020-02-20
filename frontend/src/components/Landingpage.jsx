import React from 'react';

import './index.css';

// React-router-dom
import { Link } from 'react-router-dom';

// Material-UI
import { IconButton } from '@material-ui/core/';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

// Axios
import Axios from 'axios';

class Landingpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			temp: '',
			movieName: '',
			status: false,
			upComingArr: [],
			getAllDetails: [],
			runData: '',
			totalPages: 0,
			page: 0
		};
	}

	componentDidMount = (page = 1) => {
		Axios.get(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=f7304a4e29a411a4c5676db97e0a3296&language=en-US&page=${page}`
		)
			.then((res) => {
				this.setState({
					upComingArr: res.data.results,
					totalPages: res.data.total_pages
				});
				for (var i = 0; i < res.data.results.length; i++) {
					Axios.get(
						`https://api.themoviedb.org/3/movie/${this.state.upComingArr[i][
							'id'
						]}?api_key=f7304a4e29a411a4c5676db97e0a3296&language=en-US&page=${page}`
					).then((res) => {
						this.setState({
							temp: res.data
						});
						this.state.getAllDetails.push(this.state.temp);
					});
				}
			})
			.catch((err) => alert(err));
	};

	pagination = (paging) => {
		this.setState({
			page: paging
		});
		this.componentDidMount((this.page = paging));
	};

	getRuntime = (id) => {
		for (var i = 0; i < this.state.getAllDetails.length; i++) {
			if (this.state.getAllDetails[i]['id'] === id) {
				return this.state.getAllDetails[i]['runtime'];
			}
		}
    };
    
    getRating = (id) => {
		for (var i = 0; i < this.state.getAllDetails.length; i++) {
			if (this.state.getAllDetails[i]['id'] === id) {
				return this.state.getAllDetails[i]['popularity'];
			}
		}
    };
    
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleEnter = (e) => {
		var code = e.keyCode || e.which;
		if (code === 13) {
			alert(`${this.state.movieName}`);
		}
	};

	render() {
		const { movieName, upComingArr } = this.state;
		const store = [];
		for (let i = 1; i <= this.state.totalPages; i++) {
			store.push(i);
		}
		const pageNumbers = store.map((num, index) => {
			return (
				<button key={index} className="btn btn-dark ml-2" onClick={() => this.pagination(num)}>
					{num}
				</button>
			);
		});
		let upComing = upComingArr.map((e) => {
			return (
				<div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
					<div className="card shadow" style={{ borderRadius: '10px' }}>
						<Link key={e.id} to={`/moviedetails/${e.id}`}>
							<img
								src={`http://image.tmdb.org/t/p/w500${e.poster_path}`}
								className="card-img-top"
								alt={e.title}
							/>
						</Link>
						<div className="card-body">
							<small className="card-title">
								<span style={{float : 'left', color: '#4A4A4A' }}>{e.title}</span><span style={{float : 'right', color : '#CF3721'}}>{this.getRuntime(e.id)}</span>
							</small><br />
							<small>
								<span style={{float : 'left', color: '#4A4A4A' }}></span><span style={{float : 'right', color : '#9B9B9B'}}>{this.getRating(e.id)}</span>
							</small>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				<nav className="navbar shadow navbar-light bg-light">
					<form className="form-inline">
						<div className="input-group">
							<div className="input-group-prepend">
								<span
									className="input-group-text"
									// style={{ backgroundColor: '#9B9B9B' }}
									id="basic-addon1"
								>
									<SearchIcon />
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								placeholder="Search..."
								name="movieName"
								value={movieName}
								onChange={this.handleChange}
								onKeyPress={this.handleEnter}
								// style={{ backgroundColor: '#9B9B9B', width: '100%' }}
							/>
						</div>
					</form>
					<IconButton edge="start" style={{ color: '#4A4A4A' }} aria-label="menu" href="/">
						<HomeIcon />
					</IconButton>
				</nav>
				<div className="container">
					<div className="row">{upComing}</div>
				</div>
				<div className="conatiner text-center mx-3 my-3">{pageNumbers}</div>
			</div>
		);
	}
}

export default Landingpage;
