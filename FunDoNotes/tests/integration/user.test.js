import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
let user1Token;
let user2Token;
let wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmU4ZWRlNDI2OTkxMWY5NDhmOTQ5ZCIsImVtYWlsIjoicHJhdmluQGdtYWlsLmNvbSIsImlhdCI6MTY3MzY2ODM1Nn0.e68c_dYMWPiKofma6X2zJFP0xUi-5bzougUYMAxG6lv";
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

		it('should register user 2 and return user details', (done) => {
			const user = {
				firstName: "Pravin",
				lastName: "Bhoskar",
				email: "pravin@gmail.com",
				password: "pravin@123"
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

		it('should login user 2 and return user details', (done) => {
			const user = {
				email: "pravin@gmail.com",
				password: "pravin@123"
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
					user2Token = res.body.token;
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

	/**
	 * Test the POST note route
	 * - should create note and return note details
	 * - should create note and return error for title require
	 * - should create note and return error for title length
	 * - should create note and return error for description require
	 * - should create note and return error for description length
	 * - should create note and return error for authorization
	 * - should create note and return error for invalid token
	 */
	describe('POST /notes', () => {
		it('should create note and return note details', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(201);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note created successfully");
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("title").to.be.equal(note.title);
					expect(res.body.data).to.have.property("description").to.be.equal(note.description);
					done();
				});
		});

		it('should create note and return error for title require', (done) => {
			const note = {
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"title\" is required");
					expect(res.body.data).to.be.an('string');
					expect(res.body.data).to.be.equal('');
					done();
				});
		});

		it('should create note and return error for title length', (done) => {
			const note = {
				title: "Pra",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"title\" length must be at least 4 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should create note and return error for description require', (done) => {
			const note = {
				title: "Pratik note"
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"description\" is required");
					expect(res.body.data).to.be.an('string');
					expect(res.body.data).to.be.equal('');
					done();
				});
		});

		it('should create note and return error for description length', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Prat"
			};
			request(app)
				.post('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("\"description\" length must be at least 5 characters long");
					expect(res.body.data).to.be.an('string').to.be.equal("");
					expect(res.body.data).to.be.equal("");
					done();
				});
		});

		it('should create note and return error for authorization', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.post('/api/v1/notes')
                .send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Authorization token is required");
					done();
				});
		});

		it('should create note and return error for invalid token', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.post('/api/v1/notes')
				.set({Authorization: "bearer "+wrongToken})
                .send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("invalid signature");
					done();
				});
		});
    });

	/**
	 * Test the GET all notes route
	 * - should get all notes and return note details
	 * - should get all notes and return error for invalid token
	 */
	describe('GET /notes', () => {
		it('should get all notes', (done) => {
			request(app)
				.get('/api/v1/notes')
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("All notes fetched successfully");
					expect(res.body.data).to.be.an('array');
					const users = res.body.data;
					for (let index = 0; index < users.length; index++) {
						expect(users[index]).to.have.property("title");
						expect(users[index]).to.have.property("description");
					}
					done();
				});
		});

		it('should get all notes and return error for invalid token', (done) => {
			request(app)
				.get('/api/v1/notes')
                .set({Authorization: "bearer "+wrongToken})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("invalid signature");
					done();
				});
		});
	});
});
