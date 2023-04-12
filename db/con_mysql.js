require('dotenv').config({path:"../config/.env"});
const {createConnection}=require('mysql2/promise');


async function getConnection()
{   
    const dbserver=await createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"employee_management_system"
    });
    return dbserver;
}


module.exports=getConnection;