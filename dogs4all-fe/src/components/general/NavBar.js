import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

function Navigation() {
	return(
		<div className="navigation">
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						<img width="50px" height="50px" src={logo}/>
					</NavLink>
					<div className="container-fluid">
						<ul className="navbar-nav">
							<li className="nav-link">
								<NavLink className="nav-link" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink className="nav-link" to="/dogWalkers">
									Dog Walkers
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink className="nav-link" to="/dogTraining">
									Dog Training
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		);
}
export default Navigation;