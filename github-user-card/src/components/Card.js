import React, { Component } from 'react';

class Card extends Component {
	render() {
		return (
			<div className='card'>
				<div className='card-userInfo'>
					<img className='card-userInfo-img' src='' alt='' />
					<div className='card-userInfo-words'>
						<h1>Jane Doe</h1>
						<h2>@janedoe</h2>
						<h4>Chicago, IL</h4>
						<p>
							I’m a passionate web developer focused on frontend technologies.
						</p>
					</div>
				</div>
				<div className='card-commitMap'>commit map</div>
			</div>
		);
	}
}

export default Card;
