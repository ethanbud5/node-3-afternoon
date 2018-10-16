const users = require("./../models/users");
let id = 0;

module.exports = {
    login(req,res,next){
        let {username,password} = req.body;
        let matchingUser = users.find(user=>{
            return user.username ===username && user.password ===password;
        })
        if(matchingUser){
            req.session.user.username = username;
            res.status(200).json(req.session.user)
        }
        else{
            res.status(500);
        }
    },
    register(req,res,next){
        let {username,password} = req.body;
        users.push({username,password,id});
        id++;
        req.session.user.username = username;
        res.status(200).json(req.session.user);
    },
    signout(req,res,next){
        req.session.destroy();
        res.status(200).json(req.session);
    },
    getUser(req,res,next){
        res.status(200).json(req.session.user);
    }
}