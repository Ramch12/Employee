const joi=require('joi');

module.exports=(data)=>{
         const schema=joi.object({
            name:joi.string().required(),
            gender:joi.string().required(),
            date_of_birth:joi.date().required(),
            designation:joi.string().required(),
            salary:joi.number().required(),
            email:joi.string().email().required(),
            phone_no:joi.number().required(),
            address:joi.string().required()
         });
         return schema.validate(data);
}
