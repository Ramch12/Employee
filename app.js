const express=require('express');
const app=express();
const router=require('./router/route')
const {errorHandler}=require('./middleware/error');


app.use(express.json());

app.use('/v1',router);

app.use(errorHandler);





app.listen(3000,()=>{
    console.log("Running...")
})