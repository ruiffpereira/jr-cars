/**
 * Module dependencies
 */

import { createContext, ReactNode, useContext, useState } from 'react';

interface ILoginAutentication {
	loginAuth: (user: any) => void;
	logout: () => void;
	userAuth: any;
}

export const AuthContext = createContext({} as ILoginAutentication);

interface IProps {
	children: ReactNode;
}

export const AuthProvider = (props: IProps) => {
	const { children } = props;
	const [user, setUser] = useState();

	return (
		<AuthContext.Provider
			value={{
				loginAuth: (user: any) => {
					setUser(user);
				},
				logout: () => {
					setUser(undefined);
				},
				userAuth: user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuthContext() {
	return useContext(AuthContext);
}
