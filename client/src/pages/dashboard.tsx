import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';

const Dashboard = () => {
	const { logout } = useContext(AuthContext);

	return (
		<>
			<h1>Dashboard</h1>
			<button onClick={logout}>Logout</button>
		</>
	);
};

export default Dashboard;
