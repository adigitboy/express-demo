const express = require('express');
const app = express();

const logger = require('./logger');
const courses = require('./routes/courses')
const home = require('./routes/home'); 

app.use(express.json());

app.use(logger);

app.use(function(req,res,next){
    console.log('authentication in progress..');
    next();
})

app.use('/api/courses',courses);
app.use('/',home);

const port = process.env.PORT || 3000; 






app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})