const swag = require("./../models/swag");

module.exports = {
    search(req,res,next){
        let category = req.query.category;
        if(category){
            let filteredCategory = swag.filter(item=>item.category = category);
            res.status(200).json(filteredCategory);
        }
        else{
            res.status(200).json(swag);
        }
    }
}