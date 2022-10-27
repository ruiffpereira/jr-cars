import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const NewDashboard = () => {
	const { logout } = useContext(AuthContext);

	return (
		<>
			<h1>Dashboard</h1>
			<button onClick={logout}>Logout</button>
		</>
	);
};

export default NewDashboard;
