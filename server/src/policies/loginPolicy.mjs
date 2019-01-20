import joi from 'joi';

export function loginPolicy(req, res, next) {
    const { error } = joi.validate(req.body, {
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    if (error) {
        res.status(400).json({
            error: `'${error.details[0].context.key}' is not valid.`
        });
        return;
    }

    next();
}