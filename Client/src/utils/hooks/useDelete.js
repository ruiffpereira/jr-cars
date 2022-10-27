import axios from 'axios';

async function deleteLogins(deleteLoginValues) {
	try {
		const response = await axios.delete('http://localhost:3001/delete/', {
			data: deleteLoginValues,
		});

		return response.data;
	} catch (error) {
		console.log('Error: ', error);
	}
}

export default deleteLogins;
