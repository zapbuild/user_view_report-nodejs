const UserView = require('../models/userView');

/**
 * Report Controller
 * Modular Pattern
 */
module.exports =function(){

    const userViewReport= function(req,res){
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date('0');
        const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

        UserView.aggregate([
            
            { $match:{'viewDate':{ $gte:startDate, $lt:endDate}} },
            {
                $group:{_id:'$productId', viewCount:{$sum:1}, uniqueUsers:{$addToSet:"$userId"}, users:{$push:"$userId"}}
            },{
                $addFields:{uniqueUserCount:{$size:'$uniqueUsers'}, totalUser:{$size:"$users"}}
            }
        ], function(error, docs){
            
            if(error){    
                res.json({
                    status:false,
                    error:{
                        message: error.message
                    }
                })
            }

            res.json(docs);
        })
    }


    return {
        userViewReport
    }

}();