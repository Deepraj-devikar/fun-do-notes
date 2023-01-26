import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
let user1Token;
describe('User APIs Test', () => {
	before((done) => {
		const clearCollections = () => {
			for (const collection in mongoose.connection.collections) {
				mongoose.connection.collections[collection].deleteOne(() => {});
			}
		};

		const mongooseConnect = async () => {
			await mongoose.connect(process.env.DATABASE_TEST);
			clearCollections();
		};

		if (mongoose.connection.readyState === 0) {
			mongooseConnect();
		} else {
			clearCollections();
		}

		done();
	});

	/**
	 * Test the register user route
	 * - should register user and return user details
	 * - should return error for first name it is required
	 * - should return error for first name length
	 * - should return error for last name it is required
	 * - should return error for last name length
	 * - should return error for email it is required
	 * - should return error for email format
	 * - should return error for password it is required
	 * - should return error for password length
	 * - should return error route not found
	 */
	describe('POST /users/register', () => {
		it('should register user and return user details', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(201);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("User created successfully");
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("firstName").to.be.equal(user.firstName);
					expect(res.body.data).to.have.property("lastName").to.be.equal(user.lastName);
					expect(res.body.data).to.have.property("email").to.be.equal(user.email);
					expect(res.body.data).to.have.property("password").to.be.not.equal(user.password);
					done();
				});
		});

		it('should return error for first name it is required', (done) => {
			const user = {
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"firstName\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for first name length', (done) => {
			const user = {
				firstName: "Pra",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"firstName\" length must be at least 4 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for last name it is required', (done) => {
			const user = {
				firstName: "Pratik",
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"lastName\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for last name length', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nik",
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"lastName\" length must be at least 4 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for email it is required', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"email\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for email format', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal( "\"email\" must be a valid email");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for password it is required', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"password\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for password length', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "prati"
			};
			request(app)
				.post('/api/v1/users/register')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"password\" length must be at least 6 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error route not found', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "pratik@1234"
			};
			request(app)
				.post('/api/v1/users/registe')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Ooops, route not found");
					done();
				});
		});
	});

	/**
	 * Test the login user route
	 * - should login user and return user details
	 * - should return error for email is required
	 * - should return error for email format
	 * - should return error for password it is required
	 * - should return error for password length
	 * - should return error route not found
	 * - should return error for user not found
	 * - should return error for invalid password
	 */
	describe('POST /users/login', () => {
		it('should login user and return user details', (done) => {
			const user = {
				email: "pratik@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.be.an("number");
					expect(res.body.error).to.be.equal(0);
					expect(res.body.message).to.be.a('string');
					expect(res.body.message).to.be.equal("Login successfull");
					expect(res.body.token).to.be.a('string');
					expect(res.body.user).to.be.an('object');
					expect(res.body.user).to.have.property("firstName").to.be.equal("Pratik");
					expect(res.body.user).to.have.property("lastName").to.be.equal("Nikhare");
					expect(res.body.user).to.have.property("email").to.be.equal(user.email);
					expect(res.body.user).to.have.property("password").to.be.not.equal(user.password);
					user1Token = res.body.token;
					done();
				});
		});

		it('should return error for email is required', (done) => {
			const user = {
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"email\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for email format', (done) => {
			const user = {
				email: "pratik",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal( "\"email\" must be a valid email");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for password it is required', (done) => {
			const user = {
				email: "pratik@gmail.com",
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"password\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error for password length', (done) => {
			const user = {
				email: "pratik@gmail.com",
				password: "prati"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"password\" length must be at least 6 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should return error route not found', (done) => {
			const user = {
				firstName: "Pratik",
				lastName: "Nikhare",
				email: "pratik@gmail.com",
				password: "pratik@1234"
			};
			request(app)
				.post('/api/v1/users/logi')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Ooops, route not found");
					done();
				});
		});

		it('should return error for user not found', (done) => {
			const user = {
				email: "pratik1@gmail.com",
				password: "pratik@123"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.be.an("number");
					expect(res.body.error).to.be.equal(1);
					expect(res.body.message).to.be.a('string');
					expect(res.body.message).to.be.equal("User Not found.");
					done();
				});
		});

		it('should return error for invalid password', (done) => {
			const user = {
				email: "pratik@gmail.com",
				password: "pratik@12318854"
			};
			request(app)
				.post('/api/v1/users/login')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(401);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.be.an("number");
					expect(res.body.error).to.be.equal(1);
					expect(res.body.message).to.be.a('string');
					expect(res.body.message).to.be.equal("Invalid Password!");
					done();
				});
		});
	});

	/**
	 * Test forget password route
	 * - should response as send link in mail
	 * - should response email is required
	 * - should response needs valid email
	 * - should response user not found 
	 */
	describe('POST /users/forget-password', () => {
		it('should forget passowrd and return response as send link in mail', (done) => {
			const user = {
				email: "pratik@gmail.com"
			};
			request(app)
				.post('/api/v1/users/forget-password')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.be.an("number");
					expect(res.body.error).to.be.equal(0);
					expect(res.body.message).to.be.a('string');
					expect(res.body.message).to.be.equal("Password reset link is send to your email.");
					done();
				});
		});

		it('should forget passowrd and return response as send link in mail', (done) => {
			request(app)
				.post('/api/v1/users/forget-password')
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"email\" is required");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should forget password and return error for email format', (done) => {
			const user = {
				email: "pratik"
			};
			request(app)
				.post('/api/v1/users/forget-password')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal( "\"email\" must be a valid email");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should forget password return error for user not found', (done) => {
			const user = {
				email: "pratik1@gmail.com"
			};
			request(app)
				.post('/api/v1/users/forget-password')
				.send(user)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body.error).to.be.an("number");
					expect(res.body.error).to.be.equal(1);
					expect(res.body.message).to.be.a('string');
					expect(res.body.message).to.be.equal("User Not found.");
					done();
				});
		});
	});	
});

export { user1Token };