/** Module dependencies. */

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import LoginTable from '../components/loginTable/table';
import styled from 'styled-components';
import deleteLogins from '../utils/hooks/useDelete';

/** Module styles. */

/* Function `Home` page. */

function Home() {
	const [loginDataValues, setloginDataValues] = useState();
	const [deleteLoginValues, setDeleteLoginValues] = useState([]);

	const handleDeleteButton = async () => {
		deleteLogins(deleteLoginValues);
	};

	const selectIdValue = (eventId, eventValue) => {
		if (eventValue === true) {
			setDeleteLoginValues(prevValue => [...prevValue, parseInt(eventId)]);
		} else {
			const toDelte = deleteLoginValues.findIndex(value => value === eventId);
			deleteLoginValues.splice(toDelte, 1);
		}
	};

	useEffect(() => {
		Axios.get('http://localhost:3001/getLoginData').then(response => {
			setloginDataValues(response.data);
			//console.log(response.data);
		});
	}, []);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Email</th>
						<th>Login</th>
					</tr>
				</thead>
				<tbody>
					{typeof loginDataValues !== 'undefined' &&
						loginDataValues.map(value => {
							return (
								<LoginTable
									key={value.idLogin}
									loginDataValues={loginDataValues}
									setloginDataValues={setloginDataValues}
									id={value.idLogin}
									email={value.email}
									password={value.password}
									toDelete={(id, value) => selectIdValue(id, value)}
								/>
							);
						})}
				</tbody>
			</table>
			<button>Editar</button>
			<button onClick={() => handleDeleteButton()}>delete</button>
		</div>
	);
}

export default Home;
