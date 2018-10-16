module.exports = {
    checkForSession(req,res,next){
        if(req.session.user){
            next();
        }
        else{
            req.session.user = {username:"",cart:[],total:0}
            next()
        }
        //console.log("checking for session")
    }
}