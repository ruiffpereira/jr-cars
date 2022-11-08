/**
 * Module dependencies.
 */

import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import paths from 'src/routes/route-paths';
import LoginPage from 'src/pages/login';
import Dashboard from 'src/pages/dashboard';
import { AuthContext } from 'src/context/auth';

const Router = () => {
	const { userAuth } = useContext(AuthContext);

	return (
		<Routes>
			{userAuth ? (
				//protected pages
				<Route path={paths.home} element={<Dashboard />} />
			) : (
				//unprotected pages
				<>
					<Route path="/" element={<LoginPage />} />
				</>
			)}
		</Routes>
	);
};

export default Router;
