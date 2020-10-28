import React, { Component } from 'react';
import axios from 'axios';

import Card from './components/Card';
import './style.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			username: '',
			commits: [],
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
						return <Card key={user.id} user={user} />;
					})}
				</div>
			</div>
		);
	}
}

export default App;
