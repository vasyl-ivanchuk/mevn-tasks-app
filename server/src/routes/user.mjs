import { default as asyncHandler } from 'express-async-handler';
import { User } from '../models/user';

export const login = tokenProvider => asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).json({
            error: 'The login information is incorrect.'
        });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(403).json({
            error: 'The login information is incorrect.'
        });
    }

    const userDto = { email: user.email, fullName: user.fullName, _id: user._id };

    res.json({
        ...userDto,
        token: tokenProvider.getAuthToken(userDto)
    });
});