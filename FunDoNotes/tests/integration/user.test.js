import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

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
});
