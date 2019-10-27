function handleError(err, res, statusCode = 500, message = 'fetch unsuccessful') {
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    })
}

function handleSuccess(res, data, statusCode = 200, message = 'fetched successfully') {
    return res.status(statusCode).json({
        success: true, 
        message, 
        data
    })
}

const notFound = (res) => res.status(200).send({success: true, message: 'not found'})
    


module.exports = { handleSuccess , handleError, notFound }   