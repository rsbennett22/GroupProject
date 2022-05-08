import React, { Fragment } from 'react';
import './general.css';

const PageNotFound = () => {
	return(
		<div>
			<h1>Error 404! Page Not Found!</h1>
			<Fragment>
				<br />
				<a href="/"><input type="button" value="Visit Homepage" className="visitHome" /></a>
			</Fragment>
		</div>
	);
};
export default PageNotFound;