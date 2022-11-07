import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import useAuthContext from 'src/context/auth';

function LoginPage(): JSX.Element {
	interface UserDetailsLogin {
		email: string;
		password: string;
	}

	const { loginAuth } = useAuthContext();

	const [loginValues, setloginValues] = useState<UserDetailsLogin>({
		email: '',
		password: '',
	});

	const handleChangeValues = (value: ChangeEvent<HTMLInputElement>) => {
		if (value.target.name === 'email') {
			setloginValues(prev => ({
				email: value.target.value,
				password: prev.password,
			}));
		}
	};

	const submit = async () => {
		//api login

		try {
			const { data } = await axios('http://localhost:3001/login-user', {
				params: {
					email: loginValues.email,
					password: loginValues.password,
				},
			});
			loginAuth(data);
			return data;
		} catch (error) {
			//console.log(error);
		}
	};

	return (
		<form>
			<input
				type="email"
				name="ss"
				placeholder="Type Your Email"
				className="login-email"
				onChange={handleChangeValues}
			/>
			<input
				type="password"
				name="password"
				placeholder="Type Your Password"
				className="login-password"
				onChange={handleChangeValues}
			/>

			<button onClick={() => submit()}></button>
		</form>
	);
}

export default LoginPage;
