function logs(req,res,next){
    console.log('Logging...');
    next();
}

module.exports = logs;