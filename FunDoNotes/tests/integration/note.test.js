import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

import { user1Token } from './user.test'

const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmU4ZWRlNDI2OTkxMWY5NDhmOTQ5ZCIsImVtYWlsIjoicHJhdmluQGdtYWlsLmNvbSIsImlhdCI6MTY3MzY2ODM1Nn0.e68c_dYMWPiKofma6X2zJFP0xUi-5bzougUYMAxG6lv";
let createdNote;
const wrongNoteId = "63c922898f37bb601c2a965a";
let updatedNote;
describe('Note APIs Test', () => {
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
					expect(res.body.data).to.have.property("isArchive").to.be.false;
					expect(res.body.data).to.have.property("isTrash").to.be.false;
					createdNote = res.body.data;
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
					expect(res.body.message).to.be.oneOf([
						"All notes fetched successfully",
						"All notes fetched successfully from redis cache"
					]);
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

	/**
	 * Test the GET note by id route
	 * - should get note by id and return note details
	 * - should get note by id and return error for invalid token
	 * - should get note by id and return error for note not found
	 */
	describe('GET /notes', () => {
		it('should get note by id and return note details', (done) => {
			request(app)
				.get('/api/v1/notes/'+createdNote._id)
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.oneOf([
						"Note fetched successfully",
						"Note fetched successfully from redis cache"
					]);
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("title").to.equal(createdNote.title);
					expect(res.body.data).to.have.property("description").to.equal(createdNote.description);
					expect(res.body.data).to.have.property("_id").to.equal(createdNote._id);
					done(); 
				});
		});

		it('should get note by id and return error for note not found', (done) => {
			request(app)
				.get('/api/v1/notes/'+wrongNoteId)
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note not found");
					done();
				});
		});

		it('should get note by id and return error for invalid token', (done) => {
			request(app)
				.get('/api/v1/notes/'+createdNote._id)
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

	/**
	 * Test the PUT note route
	 * - should update note and return note details
	 * - should update note and return error for title require
	 * - should update note and return error for title length
	 * - should update note and return error for description require
	 * - should update note and return error for description length
	 * - should update note and return error for authorization
	 * - should update note and return error for invalid token
	 */
	describe('PUT /notes', () => {
		it('should update note and return note details', (done) => {
			const note = {
				title: "Pratik Note 2",
				description: "Pratik Nikhare is creating note 2."
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
                .set({Authorization: "bearer "+user1Token})
				.send(note)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(202);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note updated successfully");
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("title").to.be.equal(note.title);
					expect(res.body.data).to.have.property("description").to.be.equal(note.description);
					expect(res.body.data).to.have.property("isArchive").to.be.false;
					expect(res.body.data).to.have.property("isTrash").to.be.false;
					expect(res.body.data).to.have.property("_id").to.be.equal(createdNote._id);
					updatedNote = res.body.data;
					done();
				});
		});

		it('should update note and return error for title require', (done) => {
			const note = {
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
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

		it('should update note and return error for title length', (done) => {
			const note = {
				title: "Pra",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
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

		it('should update note and return error for description require', (done) => {
			const note = {
				title: "Pratik note"
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
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

		it('should update note and return error for description length', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Prat"
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
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

		it('should update note and return error for authorization', (done) => {
			const note = {
				title: "Pratik Note",
				description: "Pratik Nikhare is creating note."
			};
			request(app)
				.put('/api/v1/notes/'+createdNote._id)
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
				.put('/api/v1/notes/'+createdNote._id)
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
	 * Test the PUT archive note route
	 * - should update note and make archive note and return note details
	 * - should update note and make archive note and return error for authorization
	 * - should update note and make archive note and return error for invalid token
	 */
	describe('PUT /notes', () => {
		it('should update note and make archive note and return note details', (done) => {
			request(app)
				.put('/api/v1/notes/'+createdNote._id+'/archive')
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(202);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note archived successfully");
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("_id").to.be.equal(updatedNote._id);
					expect(res.body.data).to.have.property("title").to.be.equal(updatedNote.title);
					expect(res.body.data).to.have.property("description").to.be.equal(updatedNote.description);
					expect(res.body.data).to.have.property("isTrash").to.be.equal(updatedNote.isTrash);
					expect(res.body.data).to.have.property("isArchive").to.be.true;
					updatedNote = res.body.data;
					done();
				});
		});

		it('should update note and make archive note return error for authorization', (done) => {
			request(app)
				.put('/api/v1/notes/'+updatedNote._id+'/archive')
                .end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Authorization token is required");
					done();
				});
		});

		it('should update note and make archive note return error for invalid token', (done) => {
			request(app)
				.put('/api/v1/notes/'+updatedNote._id+'/archive')
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

	/**
	 * Test the PUT trash note route
	 * - should update note and make archive note and return note details
	 * - should update note and make archive note and return error for authorization
	 * - should update note and make archive note and return error for invalid token
	 */
	describe('PUT /notes', () => {
		it('should update note and make trash note and return note details', (done) => {
			request(app)
				.put('/api/v1/notes/'+createdNote._id+'/trash')
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(202);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note trashed successfully");
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property("_id").to.be.equal(updatedNote._id);
					expect(res.body.data).to.have.property("title").to.be.equal(updatedNote.title);
					expect(res.body.data).to.have.property("description").to.be.equal(updatedNote.description);
					expect(res.body.data).to.have.property("isArchive").to.be.equal(updatedNote.isArchive);
					expect(res.body.data).to.have.property("isTrash").to.be.true;
					updatedNote = res.body.data;
					done();
				});
		});

		it('should update note and make trash note return error for authorization', (done) => {
			request(app)
				.put('/api/v1/notes/'+updatedNote._id+'/trash')
                .end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Authorization token is required");
					done();
				});
		});

		it('should update note and make trash note return error for invalid token', (done) => {
			request(app)
				.put('/api/v1/notes/'+updatedNote._id+'/trash')
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

	/**
	 * Test the DELETE note route
	 * - should delete note and return error for authorization
	 * - should delete note and return error for invalid token
	 * - should delete note
	 */
	describe('DELETE /notes', () => {
		it('should delete note and return error for authorization', (done) => {
			request(app)
				.delete('/api/v1/notes/'+updatedNote._id)
                .end((err, res) => {
					expect(res.statusCode).to.be.equal(400);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Authorization token is required");
					done();
				});
		});

		it('should delete note and return error for invalid token', (done) => {
			request(app)
				.delete('/api/v1/notes/'+updatedNote._id)
				.set({Authorization: "bearer "+wrongToken})
                .end((err, res) => {
					expect(res.statusCode).to.be.equal(500);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("invalid signature");
					done();
				});
		});
		
		it('should delete note', (done) => {
			request(app)
				.delete('/api/v1/notes/'+createdNote._id)
                .set({Authorization: "bearer "+user1Token})
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(202);
					expect(res.body).to.be.an('object');
					expect(res.body.message).to.be.an('string');
					expect(res.body.message).to.be.equal("Note deleted successfully");
					done();
				});
		});		
	});
});
