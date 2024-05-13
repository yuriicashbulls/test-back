const { StatusCodes } = require('http-status-codes');

const errorCode = {
    // Wrong data. To send the correct data you need to use the documentation.
    validation: 100
};

const error = {
    validation: (res, error) => {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: error.message.replace(/"/g, ''),
            error: 'Bad request',
            errorCode: errorCode.validation
        });
    }
};

module.exports = {
    errorCode,
    error
};
