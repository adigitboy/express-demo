const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000; 

const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'}
];

app.get('/',(req,res)=>{
    res.send('Hello!!, there');
});

app.get('/api/courses/:id/:notes',(req,res)=>{
    res.send(req.query);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find( c => c.id==parseInt(req.params.id));
    if(!course) res.status(404);
    else res.send(course);
});


app.post('/api/courses',(req,res)=>{
    const course = {
        id : courses.length+1, 
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});


app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})