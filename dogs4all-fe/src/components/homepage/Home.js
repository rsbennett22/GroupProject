import React from 'react';
import './../general/general.css'

function Home() {
	return (
		<div className="home">
			<div class="container-fluid">
				<div class="col-lg-5">
					<h1>Home</h1>
					<div id = "world_logo"><img src = {require('.//world.jpg')}></img></div>
					<div id = "home_description"><i>Welcome to Dogs4All! We are an organization seeks to educate pet owners about the needs of their pets, and provide our customers with the best quality products and services that we can. All of our breeders are hand selected to ensure humane conditions for all the animals that are sold on our platform, we are very aware of the animal abuse that is rampant in the dog selling industry and have no intent of profiting from that abuse. All of our products and services are monitored via a customer rating system and occasional manual review to ensure quality. </i></div>
				</div>
			</div>
		</div>
		);
}
export default Home;