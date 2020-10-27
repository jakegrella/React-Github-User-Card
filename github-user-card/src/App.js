import React, { Component } from 'react';
import axios from 'axios';

// import Card from './components/Card';

class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			username: '',
		};
	}

	componentDidMount() {
		console.log('component mounted');
		this.fetchPeople('jakegrella');
		// this.fetchPeople(this.state.username);
	}

	componentDidUpdate(prevProps, prevState) {
		// if (prevState.people !== this.state.people) {
		// 	// this.fetchPeople('jakegrella'); // runs on every single update (too often)
		// 	// this.fetchPeople(this.state.username); // creates 404 error
		// 	this.fetchPeople(this.state.username);
		// }
		// if (prevState.people.length !== this.state.people.length) {
		// 	if (this.state.username === 'chihuahua') {
		// 		console.log('update');
		// 	}
		// }
		// if (this.state.username !== prevState.username) {
		// 	console.log('update');
		// }
	}

	fetchPeople = (username) => {
		axios
			.get(`https://api.github.com/users/${username}`)
			.then((resp) => {
				// console.log(resp);
				this.setState({
					people: [...this.state.people, resp.data],
				});
				console.log('people', this.state.people);
			})
			.catch((err) => console.log(err));
	};

	handleChange = (e) => {
		this.setState({ username: e.target.value });
	};

	handleAddUser = (e) => {
		e.preventDefault();
		this.fetchPeople(this.state.username);
		this.setState({ username: '' });
	};

	render() {
		return (
			<div className='App'>
				<h1>GitHub Cards</h1>
				<form onSubmit={this.handleAddUser}>
					<input
						value={this.state.username}
						onChange={this.handleChange}
						type='text'
						placeholder='Username'
					/>
					<button>Add User</button>
				</form>
				<div className='cards'>
					{this.state.people.map((user) => {
						return (
							<div className='card'>
								<div className='card-userInfo'>
									<img
										className='card-userInfo-img'
										src={user.avatar_url}
										alt={user.name}
									/>
									<div className='card-userInfo-words'>
										<h1>{user.name}</h1>
										<h2>@{user.login}</h2>
										<h4>{user.location}</h4>
										<p>{user.public_repos} public repos</p>
									</div>
								</div>
								<div className='card-commitMap'>commit map</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default App;
