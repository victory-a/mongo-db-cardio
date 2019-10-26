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

module.exports = { handleSuccess , handleError }   