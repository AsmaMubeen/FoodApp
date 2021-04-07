let utils = require('../../common/utils');

let underscore = require('underscore');


let requiresBody = (req,res,next)=>{
    if(req.body && underscore.isObject(req.body) && !underscore.isEmpty(req.body)){
        next();
    }else{
        res.status(400).json({status:false,message:"Invalid or empty data/body",data:null});
    }
};


module.exports = {
    requiresBody
};
