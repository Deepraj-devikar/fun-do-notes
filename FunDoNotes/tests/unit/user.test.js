import { expect } from 'chai';
import { 
    registerUserValidator, 
    loginUserValidator, 
    forgetPasswordValidator, 
    resetPasswordValidator } from '../../src/validators/user.validator';

let expecteErrorValue;
function myNext(error = false) {
    if (error != false) {
        error = true;
    }
    expect(error).to.be.equal(expecteErrorValue);
}

/**
 * Test the registerUserValidator
 * - should register user correct error false
 * - should register user incorrect error true
 */
describe('registerUserValidator', () => {
    it('should register user correct error false', () => {
        // error will not be in here
        expecteErrorValue = false;
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Shiv",
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
    });

    it('should register user incorrect error true', () => {
        // error will be in here
        expecteErrorValue = true;
        // first name is reuired
        registerUserValidator(
            {
                "body": {
                    "lastName": "Shiv",
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // first name should be min 4 length
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ga",
                    "lastName": "Shiv",
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // last name should required
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // last name should min 4 length
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Siv",
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // email should required
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Shiv",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // should valid email
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Shiv",
                    "email": "ganesh",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // password required
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Shiv",
                    "email": "ganesh@gmail.com"
                },
            },
            {},
            myNext
        );
        // password length be min 6
        registerUserValidator(
            {
                "body": {
                    "firstName": "Ganesh",
                    "lastName": "Shiv",
                    "email": "ganesh@gmail.com",
                    "password": "@123"
                },
            },
            {},
            myNext
        );
    });
});

/**
 * Test the loginUserValidator
 * - should login user correct error false
 * - should login user incorrect error true
 */
describe('loginUserValidator', () => {
    it('should login user correct error false', () => {
        // error will not be in here
        expecteErrorValue = false;
        loginUserValidator(
            {
                "body": {
                    "email": "ganesh@gmail.com",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
    });

    it('should login user incorrect error true', () => {
        // error will be in here
        expecteErrorValue = true;
        // email should required
        loginUserValidator(
            {
                "body": {
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // should valid email
        loginUserValidator(
            {
                "body": {
                    "email": "ganesh",
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // password required
        loginUserValidator(
            {
                "body": {
                    "email": "ganesh@gmail.com"
                },
            },
            {},
            myNext
        );
        // password length be min 6
        loginUserValidator(
            {
                "body": {
                    "email": "ganesh@gmail.com",
                    "password": "@123"
                },
            },
            {},
            myNext
        );
    });
});

/**
 * Test the forgetPasswordValidator
 * - should forget password email correct error false
 * - should forget password email incorrect error true
 */
describe('forgetPasswordValidator', () => {
    it('should forget password email correct error false', () => {
        // error will not be in here
        expecteErrorValue = false;
        forgetPasswordValidator(
            {
                "body": {
                    "email": "ganesh@gmail.com"
                },
            },
            {},
            myNext
        );
    });

    it('should forget password email incorrect error true', () => {
        // error will be in here
        expecteErrorValue = true;
        // email should required
        forgetPasswordValidator(
            {
                "body": {},
            },
            {},
            myNext
        );
        // should valid email
        forgetPasswordValidator(
            {
                "body": {
                    "email": "ganesh"
                },
            },
            {},
            myNext
        );
    });
});

/**
 * Test the resetPasswordValidator
 * - should reset password correct error false
 * - should reset password incorrect error true
 */
describe('resetPasswordValidator', () => {
    it('should reset password correct error false', () => {
        // error will not be in here
        expecteErrorValue = false;
        resetPasswordValidator(
            {
                "body": {
                    "password": "ganesh@123",
                    "confirmPassword": "ganesh@123"
                },
            },
            {},
            myNext
        );
    });

    it('should reset password incorrect error true', () => {
        // error will be in here
        expecteErrorValue = true;
        // password should required
        resetPasswordValidator(
            {
                "body": {
                    "confirmPassword": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // password length be min 6
        resetPasswordValidator(
            {
                "body": {
                    "password": "@123",
                    "confirmPassword": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // confirmPassword should required
        resetPasswordValidator(
            {
                "body": {
                    "password": "ganesh@123"
                },
            },
            {},
            myNext
        );
        // confirmPassword length be min 6
        resetPasswordValidator(
            {
                "body": {
                    "password": "ganesh@123",
                    "confirmPassword": "@123"
                },
            },
            {},
            myNext
        );
    });
});

/**
 * Test the email validation of joi
 * - email should be vaild or invalid according to email data
 */
describe('email validation', () => {
    const emailData = [
        {emailValue: "abc@yahoo.com", isValid: true},
        {emailValue: "abc-100@yahoo.com", isValid: true},
        {emailValue: "abc.100@yahoo.com", isValid: true},
        {emailValue: "abc111@abc.com", isValid: true},
        {emailValue: "abc-100@abc.net", isValid: true},
        {emailValue: "abc.100@abc.com.au", isValid: true},
        {emailValue: "abc@1.com", isValid: true},
        {emailValue: "abc@gmail.com.com", isValid: true},
        {emailValue: "abc+100@gmail.com", isValid: true},
        {emailValue: "abc", isValid: false},
        {emailValue: "abc@.com.my", isValid: false},
        {emailValue: "abc123@gmail.a", isValid: false},
        {emailValue: "abc123@.com", isValid: false},
        {emailValue: "abc123@.com.com", isValid: false},
        {emailValue: ".abc@abc.com", isValid: false},
        {emailValue: "abc()*@gmail.com", isValid: false},
        {emailValue: "abc@%*.com", isValid: false},
        {emailValue: "abc..2002@gmail.com", isValid: false},
        {emailValue: "abc.@gmail.com", isValid: false},
        {emailValue: "abc@abc@gmail.com", isValid: false},
        {emailValue: "abc@gmail.com.1a", isValid: false},
        {emailValue: "abc@gmail.com.aa.au", isValid: false},
    ];
    emailData.forEach(emailInfo => {
        it('email -> "'+emailInfo.emailValue+'" should be '+(emailInfo.isValid ? 'valid' : 'invalid'), () => {
            // error will be according to email info is valid
            expecteErrorValue = !emailInfo.isValid;
            forgetPasswordValidator(
                {
                    "body": {
                        "email": emailInfo.emailValue
                    },
                },
                {},
                myNext
            );
        });
    });
});
