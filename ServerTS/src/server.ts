/**
 * Module dependencies.
 */
import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import generateRefreshToken, { generateAcessToken } from './auth';
import { IUser } from './types/member';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Authorization from './middleware/auth';

const app = express();
const authorization = new Authorization();

app.use(cookieParser());
app.use(cors());
app.use(authorization.isAuthenticated);

//app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));c

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'cruddb',
});

app.listen(3001, () => {
	console.log('🚀Express server started at port http://localhost:3001');
});

// app.post('/add-login', (req, res) => {
// 	const { email, password } = req.body; //const email = req.body.email;
// 	let SQL = 'INSERT INTO login (email , password) VALUES (?, ?)';

// 	db.query(SQL, [email, password], (err, result) => {
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 		console.log(result);

// 		res.send(result);
// 	});
// });

interface ILoginResponse {
	result: {};
	accessToken: string;
}

interface IRequestQuery {
	email: string;
	password: string;
}

app.get(
	'/login-user',
	(
		req: Request<{}, {}, {}, IRequestQuery>,
		res: Response<ILoginResponse>,
		next: NextFunction
	) => {
		const { email, password } = req.query;
		let query = `Select idUser, email, firstName, lastName, phoneNumber from user where email = ? and password = ?`;
		db.query(query, [email, password], (err, result: [IUser]) => {
			if (err) {
				console.log('Error', err);
				return;
			}

			if (!result.length) return undefined;

			// Website you wish to allow to connect
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', 'true');

			// Pass to next layer of middleware
			next();

			res.cookie(
				'RefreshToken',
				generateRefreshToken({
					idUser: result[0].idUser,
					firstName: result[0].firstName,
					lastName: result[0].lastName,
					email: result[0].email,
					phoneNumber: result[0]?.phoneNumber,
				}),
				{ httpOnly: true }
			);

			res.send({
				result,
				accessToken: generateAcessToken({
					idUser: result[0].idUser,
					firstName: result[0].firstName,
					lastName: result[0].lastName,
					email: result[0].email,
					phoneNumber: result[0]?.phoneNumber,
				}),
			});
		});
	}
);

// app.get('/', function (req, res) {
// 	// Cookies that have not been signed
// 	console.log('Cookies: ', req.cookies);

// 	// Cookies that have been signed
// 	console.log('Signed Cookies: ', req.signedCookies);
// });

// app.get('/getLoginData', (req, res) => {
// 	const { authorization } = req.headers;
// 	let SQL = 'SELECT * FROM user';

// 	db.query(SQL, (err, result) => {
// 		if (err) console.log(err);
// 		else res.send(result);
// 	});
// });

// app.delete('/delete/', (req, res) => {
// 	// console.log('DELETE FROM login WHERE idLogin IN (' + req.params.id + ');');
// 	console.log('req: ', req.body);

// 	let SQL = 'DELETE FROM login WHERE idLogin IN (?);';

// 	db.query(SQL, [req.body], (err, result) => {
// 		if (err) console.log(err);
// 		console.log(result);
// 		res.send(result);
// 	});
// });

// app.use(express.static(__dirname + '/public'));
