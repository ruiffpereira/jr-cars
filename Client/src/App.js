import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';
import styled from '../src/styles/global-styles';
import GlobalStyle from './styles/global-styles';
import { AuthProvider } from './context/auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<>
			<AuthProvider>
				<GlobalStyle />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
