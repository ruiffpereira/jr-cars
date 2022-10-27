/**
 * Module dependencies.
 */

import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import paths from './route-paths';
import Home from '../pages/home';
import NewDashboard from '../pages/dashboard-new';
import { AuthContext } from '../context/auth';

const Router = () => {
	const { userAuth } = useContext(AuthContext);

	return (
		<Routes>
			{userAuth ? (
				//protected pages
				<Route path="/" element={<NewDashboard />} />
			) : (
				//unprotected pages
				<>
					<Route path="/" element={<Home />} />
				</>
			)}
		</Routes>
	);
};

export default Router;
