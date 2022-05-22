const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

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
    if(!course) res.status(404).send("ID not found");
    else res.send(course);
});


app.post('/api/courses',(req,res)=>{
    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    if(result.error){
        res.status(404).send(result.error.details[0].message);
        return;
    }

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

app.put('/api/courses/:id',(req,res)=>{

    //look up for the course

    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) res.status(404).send("ID not found");

    // validate request

    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course Not Found');

    //delete

    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);

}

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})