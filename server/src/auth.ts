/**
 * Module dependecies.
 */

import jwt from 'jsonwebtoken';
import { IUser } from 'src/types/member';

//Access token serves to authenticate api requests.

export function generateAcessToken(user: IUser): string {
	if (process.env.ACCESS_SECRET) {
		const token = jwt.sign(user, process.env.ACCESS_SECRET, {
			expiresIn: '1min',
		});
		return token;
	}

	return 'Something went wrong';
}

// Refresh token serves to generate an access token and
// lives for more time that the Access token.

export default function generateRefreshToken(user: IUser): string {
	if (process.env.REFRESH_TOKEN) {
		const token = jwt.sign(user, process.env.REFRESH_TOKEN, {
			expiresIn: '2min',
		});
		return token;
	}

	return 'Something went wrong';
}
