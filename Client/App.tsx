import { RouterProvider } from 'react-router-dom';
import Router from 'src/routes/router';
import { AuthProvider } from 'src/context/auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
