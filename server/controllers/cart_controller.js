const swag = require("./../models/swag");

module.exports = {
    add(req,res,next){
        let itemToAdd = swag.find(item=>{
            return +req.query.id ===+item.id;
        })
        let hasAlready = req.session.user.cart.find(item=>item.id === itemToAdd.id)
        if(hasAlready){
            return
        }
        else{
            req.session.user.cart.push(itemToAdd)
            req.session.user.total += itemToAdd.price;
        }
        res.status(200).json(req.session.user);
    },
    remove(req,res,next){  
        let itemToRemove = swag.find(item=>{
            return +req.query.id ===+item.id;
        })
        let indexToRemove = req.session.user.cart.indexOf(item=>+item.id===+req.query.id);
        req.session.user.total -= itemToRemove.price;
        req.session.user.cart.splice(indexToRemove,1)
        
        res.status(200).json(req.session.user);
    },
    checkout(req,res,next){
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).json(req.session.user);
    }
}