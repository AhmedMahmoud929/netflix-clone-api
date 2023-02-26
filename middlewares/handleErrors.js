const AppError = require("../helpers/AppError")

// deve handler 
const deveHandller = (err,req,res)=>{
    res.status(err.statusCode || 500).json({
        err,
        status : 'faild',
        message : err.message,
        operational : err.isOperational,
        stack:err.stack
    })
}
// ValidationError handler
const ValidationError=(err)=>{
    const allErros = Object.values(err.errors).map(el=>el.message)
    console.log(allErros , "*************")
     return new AppError(400,`${allErros.join(' , ')}`)
}
// duplicate error
const DuplicateKey=(err)=>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(400,`duplicate value is : ${value}`)
}
const JsonWebTokenError =(err)=>{
    return new AppError(401,"json web token error / please login first")
}
const CastError =(err)=>{
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

    return new AppError(400,`invalid value is ${value} please enter another value`)
}
// product handler
const prodHandller = (err,req,res)=>{
    if(err.isOperational) return res.status(err.statusCode).json({
        status : err.status,
        message:err.message})
    return res.status(500).json({
        status:"error",
        err,
        message:"some thing went very wrong"})

}
const errController = (err,req,res,next)=>{
    if(process.env.NODE_ENV==="deve"){
       return deveHandller(err,req,res)
    }
    if(err.name==="ValidationError") err= ValidationError(err)
    else if(err.code=="11000") err= DuplicateKey(err)
    else if(err.name==="JsonWebTokenError") err = JsonWebTokenError(err)
    else if(err.name==="CastError") err = CastError(err)
    prodHandller(err,req,res) 
}
module.exports = errController