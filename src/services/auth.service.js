const { generateToken } = require('../helpers/jwt.helper');
let _userService = null;

class AuthService {
    constructor({ UserService }){
        _userService =  UserService;
    }
    async signUp(user){
        const { username } = user;
        const existUser = await _userService.getUserByUsername(username);
        if(existUser){
            const error = new Error();
            error.status = 400;
            error.message = "User already exist";
            throw error;
        }
        return await _userService.create(user);
    }
    async signIn(user){
        const { username, password } = user;
        const existUser = await _userService.getUserByUsername(username);
        if(!existUser){
            const error = new Error();
            error.status = 404;
            error.message = "User not found";
            throw error;
        }  
        const validPassword = existUser.comparePasswords(password);
        if(!validPassword){
            const error = new Error();
            error.status = 400;
            error.message = "Invalid password";
            throw error;            
        }
        const userToEncode = {
            username: existUser.username,
            id: existUser._id
        }
        const token = generateToken(userToEncode);

        return { token, user: existUser };

    }

}

module.exports = AuthService;