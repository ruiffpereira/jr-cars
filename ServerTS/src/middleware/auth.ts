import { TokenExpiredError, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class Authorization {
	isAuthenticated(request: Request, res: Response, next: NextFunction) {
		if (request.path !== '/login-user') {
			const authHeader = request.headers.authorization;
			const secret = process.env.ACCESS_SECRET ?? 'INVALID SECRET';

			//Bearer token
			if (authHeader) {
				console.log(authHeader);
				const token = authHeader.split(' ')[1].trim();
				console.log(token);
				if (token) {
					try {
						return verify(token, secret);
					} catch (error) {
						if (error instanceof TokenExpiredError) {
							throw new Error('Expired_Token');
						}
						throw new Error('Invalid/Expired Token');
					}
				}
				throw new Error('Authentication token must be Bearer [token]');
			}
			throw new Error('Authorization header must be provided');
		}
		next();
	}
}

// todo: If error === token expired, in the client request new access token.
// 1. create an axios instance.
// 2. add middleware to axios that checks if token is expired and request a new access token.

// todo: encrypt password

// add node_modules, yarn.lock, .env to .gitignore
// and push everything to github
