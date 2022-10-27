/** Module dependencies. */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginTable from '../components/loginTable/table';
import styled from 'styled-components';
import deleteLogins from '../utils/hooks/useDelete';
import { AuthContext } from '../context/auth';

/** Module styles. */

const Container = styled.div`
	display: grid;
	height: 100vh;
	justify-content: center;
	align-content: center;

	& > div {
		max-width: 600px;
		display: flex;
		background-color: ${props => (props.primary ? 'red' : '#fff')};
		border-radius: 5px;
	}
`;

const LoginForm = styled.div`
	text-align: center;
	padding: 20px;
`;

const InputLogin = styled.input`
	border: 0;
	border-bottom: 1px solid #777777;
	padding-bottom: 5px;
`;

const TitleLogin = styled.h1`
	font-size: 20px;
	font-weight: 700;
	padding-bottom: 20px;
`;

const LabelLogin = styled.label`
	text-align: left;
	display: block;
	padding-bottom: 10px;
	color: #777777;
	font-size: 13px;
`;

const ButtonRegister = styled.button`
	background-color: transparent;
	cursor: pointer;
`;

/* Function `Home` page. */

function Home() {
	const [loginValues, setloginValues] = useState();
	const [loginDataValues, setloginDataValues] = useState();
	const { loginAuth } = useContext(AuthContext);

	const handleChangeValues = value => {
		setloginValues(prevValue => ({
			...prevValue,
			[value.target.name]: value.target.value,
		}));
		//console.log(value.target.name + ' : ' + value.target.value);
	};

	const handleClickButton = async () => {
		try {
			const { data } = await axios('http://localhost:3001/login-user', {
				params: {
					email: loginValues.email,
					password: loginValues.password,
				},
				withCredentials: true,
			});
			console.log(data);
			loginAuth(data);
			return data;
		} catch (error) {
			console.log(error);
		}

		// axios.get('http://localhost:3001/login-user', {
		// 	email: loginValues.email,
		// 	password: loginValues.password,
		// }).then(response => {
		// 	setloginDataValues([
		// 		...loginDataValues,
		// 		{
		// 			idLogin: response.data.insertId,
		// 			email: loginValues.email,
		// 			password: loginValues.password,
		// 		},
		// 	]);
		// })
	};

	useEffect(() => {
		// Axios.get('http://localhost:3001/getLoginData').then(response => {
		// 	setloginDataValues(response.data);
		// 	console.log(response.data);
		// });
	}, []);

	return (
		<Container>
			<div>
				<LoginForm>
					<TitleLogin>Registo</TitleLogin>
					<LabelLogin>Email</LabelLogin>
					<div>
						<InputLogin
							type="text"
							name="email"
							placeholder="Type Your Email"
							className="login-email"
							onChange={handleChangeValues}
						/>
					</div>
					<br />
					<LabelLogin>Password</LabelLogin>
					<div>
						<InputLogin
							type="password"
							name="password"
							placeholder="Type Your Password"
							className="login-password"
							onChange={handleChangeValues}
						/>
					</div>
					<br />
					<ButtonRegister onClick={() => handleClickButton()}>
						Login
					</ButtonRegister>
				</LoginForm>
				{/* <LoginForm>
					<TitleLogin>Login</TitleLogin>
					<LabelLogin>Email</LabelLogin>
					<div>
						<InputLogin
							type="text"
							name="email"
							placeholder="Type Your Email"
							className="login-email"
							//onChange={}
						/>
					</div>
					<br />
					<LabelLogin>Password</LabelLogin>
					<div>
						<InputLogin
							type="password"
							name="password"
							placeholder="Type Your Password"
							className="login-password"
							//onChange={}
						/>
					</div>
					<br />
					<ButtonRegister>Login</ButtonRegister>
				</LoginForm> */}
			</div>
		</Container>
	);
}

export default Home;
