import sinon from 'sinon';
import * as policy from '../../src/policies/loginPolicy';

describe('loginPolicy', () => {
    let req, res, next;

    beforeEach(() => {
        next = sinon.stub();
        res = {
            status: sinon.stub().returns({ json: sinon.spy() })
        };
        req = {};
    });

    describe('when input is valid', () => {
        beforeEach(() => {
            req = { body: { email: 'email@domain.com', password: 'abcABC123' } };
        });

        it('should call next middleware for valid input', () => {
            policy.loginPolicy(req, res, next);
            sinon.assert.called(next);
        });
    });

    describe('when email is empty', () => {
        beforeEach(() => {
            req = { body: { password: 'abcABC123' } };
        });

        it('should return 400 response with an error', () => {
            policy.loginPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'email' is not valid.`
            });
        });
    });

    describe('when email is not valid email', () => {
        beforeEach(() => {
            req = { body: { email: 'abcABC123' } };
        });

        it('should return 400 response with an error', () => {
            policy.loginPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'email' is not valid.`
            });
        });
    });

    describe('when password is empty', () => {
        beforeEach(() => {
            req = { body: { email: 'email@domain.com' } };
        });

        it('should return 400 response with an error', () => {
            policy.loginPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'password' is not valid.`
            });
        });
    });
});
