import React, { Fragment } from 'react';
import './general.css';

//when user goes to a url not specified in App.js, load this page

const PageNotFound = () => {

	const goBack = () => {
		window.history.back();
	}

	return(
		<div>
			<h1>Error 404! Page Not Found!</h1>
			<Fragment>
				<br />
				<input type="button" value="Go Back" className="visitHome" onClick={()=>goBack()} />
			</Fragment>
		</div>
	);
};
export default PageNotFound;