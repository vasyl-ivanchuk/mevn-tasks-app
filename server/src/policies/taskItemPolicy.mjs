import joi from 'joi';

export function taskItemPolicy(req, res, next) {
    const { error } = joi.validate(req.body, {
        description: joi.string().required(),
        dueDate: joi.date().required()
    });

    if (error) {
        res.status(400).json({
            error: `'${error.details[0].context.key}' is not valid.`
        });
        return;
    }

    next();
}