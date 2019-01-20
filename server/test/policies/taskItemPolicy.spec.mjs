import sinon from 'sinon';
import * as policy from '../../src/policies/taskItemPolicy';

describe('taskItemPolicy', () => {
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
            req = { body: { description: 'description', dueDate: new Date() } };
        });

        it('should call next middleware for valid input', () => {
            policy.taskItemPolicy(req, res, next);
            sinon.assert.called(next);
        });
    });

    describe('when description is empty', () => {
        beforeEach(() => {
            req = { body: {} };
        });

        it('should return 400 response with an error', () => {
            policy.taskItemPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'description' is not valid.`
            });
        });
    });

    describe('when dueDate is empty', () => {
        beforeEach(() => {
            req = { body: { description: 'description' } };
        });

        it('should return 400 response with an error', () => {
            policy.taskItemPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'dueDate' is not valid.`
            });
        });
    });

    describe('when dueDate is not a date', () => {
        beforeEach(() => {
            req = { body: { description: 'description', dueDate: 'asd' } };
        });

        it('should return 400 response with an error', () => {
            policy.taskItemPolicy(req, res, next);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.status(400).json, {
                error: `'dueDate' is not valid.`
            });
        });
    });
});
