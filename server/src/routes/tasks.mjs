import { default as asyncHandler } from 'express-async-handler';
import { Task } from '../models/task';

export const get = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
});

export const create = asyncHandler(async (req, res) => {
    const taskItem = await Task.create({ user: req.user.id, ...req.body });
    res.json(taskItem);
});

export const update = asyncHandler(async (req, res) => {
    const updatedTaskItem = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
    );

    if (updatedTaskItem) {
        res.json(updatedTaskItem);
    } else {
        res.status(404).json({
            error: 'Task item not found.'
        });
    }
});

export const remove = asyncHandler(async (req, res) => {
    const deletedItem = await Task.findOneAndRemove({ _id: req.params.id, user: req.user.id });

    if (deletedItem) {
        res.status(204).send();
    } else {
        res.status(404).json({
            error: 'Task item not found.'
        });
    }
});