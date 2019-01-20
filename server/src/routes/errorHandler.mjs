export const handleError = (app) => {
    app.use(function (err, req, res, next) {
        // log an error
        global.console.error(err.stack);

        if (req.xhr) {
            res.status(500).json({
                error: 'Something went wrong, please try again later.'
            });
        } else {
            res.status(500).send('Something broke!');
        }

        next();
    });
};