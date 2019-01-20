import sinon from 'sinon';
import { Task } from '../../src/models/task';
import * as tasksRoute from '../../src/routes/tasks';

describe('tasks route', () => {
    let res;
    beforeEach(() => {
        res = {
            json: sinon.spy(),
            send: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy(), send: sinon.spy() })
        }
    });

    describe('get', () => {
        const tasks = [{
            id: 'id',
            description: 'description'
        }, {
            id: 'id1',
            description: 'description1'
        }];

        beforeEach(() => {
            sinon.stub(Task, 'find').returns({
                sort: sinon.stub().returns(tasks)
            });
        });

        it('should return found tasks', async () => {
            await tasksRoute.get({ user: { id: 'id' } }, res);
            sinon.assert.calledWith(Task.find, { user: 'id' });
            sinon.assert.calledWith(Task.find().sort, { createdAt: -1 });
            sinon.assert.calledWith(res.json, tasks);
        });
    });

    describe('create', () => {
        const createdTask = [{
            id: 'id',
            description: 'description'
        }];

        beforeEach(() => {
            sinon.stub(Task, 'create').returns(createdTask);
        });

        it('should create task and return it', async () => {
            const req = { user: { id: 'id' }, body: { description: 'description' } };
            await tasksRoute.create({ user: { id: 'id' }, body: req.body }, res);
            sinon.assert.calledWith(Task.create, { user: req.user.id, ...req.body });
            sinon.assert.calledWith(res.json, createdTask);
        });
    });

    describe('update', () => {
        const findAndUpdateStub = sinon.stub(Task, 'findOneAndUpdate');
        const req = { user: { id: 'userId' }, params: { id: 'taskId' } };

        it('should update task item with specified id and user.id', async () => {
            await tasksRoute.update(req, res);
            sinon.assert.calledWith(Task.findOneAndUpdate, { _id: req.params.id, user: req.user.id },
                req.body,
                { new: true });
        });

        describe('when task item doesnt exist', () => {
            beforeEach(() => {
                findAndUpdateStub.returns(null);
            });

            it('should return status 404', async () => {
                await tasksRoute.update(req, res);
                sinon.assert.calledWith(res.status, 404);
                sinon.assert.calledWith(res.status(404).json, {
                    error: 'Task item not found.'
                });
            });
        });

        describe('when task item exists', () => {
            const task = {
                id: 'id'
            };

            beforeEach(() => {
                findAndUpdateStub.returns(task);
            });

            it('should return status 200 with updated data', async () => {
                await tasksRoute.update(req, res);
                sinon.assert.calledWith(res.json, task);
            });
        });
    });

    describe('remove', () => {
        const findOneAndRemoveStub = sinon.stub(Task, 'findOneAndRemove');
        const req = { user: { id: 'userId' }, params: { id: 'taskId' } };

        it('should delete task item with specified id and user.id', async () => {
            await tasksRoute.remove(req, res);
            sinon.assert.calledWith(Task.findOneAndRemove, { _id: req.params.id, user: req.user.id });
        });

        describe('when task item doesnt exist', () => {
            beforeEach(() => {
                findOneAndRemoveStub.returns(null);
            });

            it('should return status 404', async () => {
                await tasksRoute.remove(req, res);
                sinon.assert.calledWith(res.status, 404);
                sinon.assert.calledWith(res.status(404).json, {
                    error: 'Task item not found.'
                });
            });
        });

        describe('when task item exists', () => {
            const task = {
                id: 'id'
            };

            beforeEach(() => {
                findOneAndRemoveStub.returns(task);
            });

            it('should return status 204', async () => {
                await tasksRoute.remove(req, res);
                sinon.assert.calledWith(res.status, 204);
                sinon.assert.calledOnce(res.status(204).send);
            });
        });
    });
});
