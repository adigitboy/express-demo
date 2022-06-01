const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'}
];


router.get('/:id/:notes',(req,res)=>{
    res.send(req.query);
});

router.get('/:id',(req,res)=>{
    const course = courses.find( c => c.id==parseInt(req.params.id));
    if(!course) res.status(404).send("ID not found");
    else res.send(course);
});


router.post('/',(req,res)=>{
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

router.get('/',(req,res)=>{
    res.send(courses);
});

router.put('/:id',(req,res)=>{

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

router.delete('/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course Not Found');

    //delete

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(courses);
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);

}

module.exports = router;