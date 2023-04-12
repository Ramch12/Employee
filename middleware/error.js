exports.errorHandler=(err,req,res,next)=>{

        if(err.code=='ECONREFUSE')
        {
            return res.status(500).json({status:0,Message:"Failed to connect with database"});
        }
        res.status(500).json({status:0,message:err.message});    
}