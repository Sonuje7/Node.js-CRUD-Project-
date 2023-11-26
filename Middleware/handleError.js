
const { constants } = require("../constants")
const handleError = (err, req, res, next) =>
{
    const statusCode = res.statusCode ? res.statusCode : 5000

    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:'Validation Not found', message: err.message, stackTrace: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title:'Not found', message: err.message, stackTrace: err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title:'Forbidden', message: err.message, stackTrace: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title:'unAuthorized', message: err.message, stackTrace: err.stack})
            break;
        case constants.SERVER_ERROR:
            res.json({title:'SERVER ERROR', message: err.message, stackTrace: err.stack})
            break;
        default:
            console.log('No Error, All Good..!')
            break;
    }
}


module.exports = handleError