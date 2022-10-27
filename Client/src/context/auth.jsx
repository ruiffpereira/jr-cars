/**
 * Module dependencies
 */

import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();

	return (
		<AuthContext.Provider
			value={{
				userAuth: user,
				loginAuth: user => {
					if (user) {
						setUser(user);
					}
				},
				logout: () => {
					setUser(undefined);
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
