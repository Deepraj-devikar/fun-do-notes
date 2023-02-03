import { expect } from 'chai';
import { noteValidator } from '../../src/validators/note.validator';

let expecteErrorValue;
function myNext(error = false) {
    if (error != false) {
        error = true;
    }
    expect(error).to.be.equal(expecteErrorValue);
}

/**
 * Test the noteValidator
 * - should create note correct error false
 * - should create note incorrect error true
 */
describe('noteValidator', () => {
    it('should create note correct error false', () => {
        // error will not be in here
        expecteErrorValue = false;
        noteValidator(
            {
                "body": {
                    "title": "Check",
                    "description": "Checking",
                    "userId": "lskdgahhjl"
                },
            },
            {},
            myNext
        );
    });

    it('should create note incorrect error true', () => {
        // error will not be in here
        expecteErrorValue = true;
        // title is required
        noteValidator(
            {
                "body": {
                    "description": "Checking",
                    "userId": "lskdgahhjl"
                },
            },
            {},
            myNext
        );
        // description is required
        noteValidator(
            {
                "body": {
                    "title": "Check",
                    "userId": "lskdgahhjl"
                },
            },
            {},
            myNext
        );
        // user id is required
        noteValidator(
            {
                "body": {
                    "title": "Check",
                    "description": "Checking"
                },
            },
            {},
            myNext
        );
        // titile should be min length 4
        noteValidator(
            {
                "body": {
                    "title": "Che",
                    "description": "Checking",
                    "userId": "lskdgahhjl"
                },
            },
            {},
            myNext
        );
        // description should min length 5
        noteValidator(
            {
                "body": {
                    "title": "Check",
                    "description": "Chec",
                    "userId": "lskdgahhjl"
                },
            },
            {},
            myNext
        );
        // user id min length 5
        noteValidator(
            {
                "body": {
                    "title": "Check",
                    "description": "Checking",
                    "userId": "lskd"
                },
            },
            {},
            myNext
        );
    });
});

