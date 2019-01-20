import sinon from 'sinon';
import * as policy from '../../src/policies/isAuthenticated';

describe('isAuthenticated policy', () => {
    let req, res, next;

    beforeEach(() => {
        next = sinon.stub();
        res = {
            status: sinon.stub().returns({ json: sinon.spy() })
        };
        req = {};
    });

    describe('authenticate', () => {
        const error = {};
        it('should call next middleware for an error', () => {
            policy.authenticate(req, res, next, error);
            sinon.assert.calledWith(next, error);
        });

        describe('when there is no error', () => {
            describe('when user doesnt exist', () => {
                it('should return 403 response', () => {
                    policy.authenticate(req, res, next);
                    sinon.assert.calledWith(res.status, 403);
                    sinon.assert.calledWith(res.status(403).json, {
                        error: 'Access forbiden.'
                    });
                });
            });

            describe('when user for the specified token exist', () => {
                it('should add user to the request and call next middleware', () => {
                    const user = { email: 'email' };
                    policy.authenticate(req, res, next, null, user);
                    sinon.assert.match(req.user, user);
                    sinon.assert.called(next);
                });
            });
        });
    });
});
