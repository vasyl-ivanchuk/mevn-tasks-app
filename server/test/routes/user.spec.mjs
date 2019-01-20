import sinon from 'sinon';
import { User } from '../../src/models/user';
import * as userRoute from '../../src/routes/user';

describe('login route', () => {
    let req, res;
    const getAuthTokenStub = sinon.stub();
    const loginRoute = userRoute.login({ getAuthToken: getAuthTokenStub });
    const findOneStub = sinon.stub(User, 'findOne');

    describe('login', () => {
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ json: sinon.spy() })

            };
            req = {
                body: { email: 'email@domain.com', password: 'abcABC123' }
            };

        });

        describe('when user doesnt exist', () => {
            beforeEach(() => {
                findOneStub.returns(null);
            });

            it('should return status 403', async () => {
                await loginRoute(req, res);
                sinon.assert.calledWith(User.findOne, { email: req.body.email });
                sinon.assert.calledWith(res.status, 403);
                sinon.assert.calledWith(res.status(403).json, {
                    error: 'The login information is incorrect.'
                });
            });
        });

        describe('when user exists', () => {
            describe('when password is invalid', () => {
                const user = {
                    comparePassword: sinon.stub().returns(false)
                };

                beforeEach(() => {
                    findOneStub.returns(user);
                });

                it('should return status 403', async () => {
                    await loginRoute(req, res);
                    sinon.assert.calledWith(User.findOne, { email: req.body.email });
                    sinon.assert.calledWith(user.comparePassword, req.body.password);
                    sinon.assert.calledWith(res.status, 403);
                    sinon.assert.calledWith(res.status(403).json, {
                        error: 'The login information is incorrect.'
                    });
                });
            });

            describe('when password is valid', () => {
                const user = {
                    comparePassword: sinon.stub().returns(true),
                    _id: 'id',
                    email: 'email',
                    fullName: 'fullName'
                };
                const token = "authToken";

                beforeEach(() => {
                    findOneStub.returns(user);
                    getAuthTokenStub.returns(token);
                });

                it('should return status 200 with user data', async () => {
                    await loginRoute(req, res);
                    sinon.assert.calledWith(User.findOne, { email: req.body.email });
                    sinon.assert.calledWith(user.comparePassword, req.body.password);
                    sinon.assert.calledWith(getAuthTokenStub,
                        { email: user.email, fullName: user.fullName, _id: user._id });
                    sinon.assert.calledWith(res.json,
                        { email: user.email, fullName: user.fullName, _id: user._id, token });
                });
            });
        });
    });
});
