import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import profileIcon from './profileIcon.png';
import './general.css';

const NavBar = () => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if(localStorage.getItem('token') !== null){
			setIsAuth(true);
		}
	}, []);
	return(
		<div className="navigation">
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
				{isAuth === true ? (
					<Fragment>
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
									<li id="dashboard" className="nav-link">
										<NavLink className="nav-link" to="/dashboard">
											My Account
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</Fragment>
					) : (
					<Fragment>
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
									<li id="dashboard" className="nav-link">
										<NavLink className="nav-link" to="/login">
											Login
										</NavLink>
									</li>
									<li className="nav-link">
										<NavLink className="nav-link" to="/signup">
											Signup
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</Fragment>
					)}
			</nav>
		</div>
		);
};
export default NavBar;