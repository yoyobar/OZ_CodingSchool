const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary').v2;

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: '이름, 이메일, 비밀번호 정보가 필요',
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: '이미 가입된 계정',
            });
        }

        user = await User.create({
            name,
            email,
            password,
        });

        cookieToken(user, res);
    } catch (error) {
        res.status(500).json({
            message: '서버 에러',
            error: error,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: '이메일과 비밀번호가 필요함',
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: '유저 정보 없음',
            });
        }

        const isPasswordCorrect = await user.isValidatedPassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: '잘못된 비밀번호',
            });
        }

        cookieToken(user, res);
    } catch (error) {
        res.status(500).json({
            message: '서버 에러',
            error: error,
        });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const { name, password, email, picture } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return (
                res.status(404),
                json({
                    message: '유저 정보 없음',
                })
            );
        }

        user.name = name;
        if (picture && !password) {
            user.picture = picture;
        } else if (password && !picture) {
            user.password = password;
        } else if (picture && password) {
            user.picture = picture;
            user.password = password;
        }
        const updatedUser = await user.save();
        cookieToken(updatedUser, res);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error });
    }
};

exports.logout = async (req, res) => {
    res.status(200)
        .cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: '로그 아웃',
        });
};

exports.uploadPicture = async (req, res) => {
    const { path } = req.file;
    try {
        let result = await cloudinary.uploader.upload(path, {
            folder: 'Airbnb/Users',
        });
        res.status(200).json(result.secure_url);
    } catch (error) {
        res.status(500).json({
            error,
            message: '서버 에러',
        });
    }
};
