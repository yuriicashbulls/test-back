const { StatusCodes } = require('http-status-codes');

async function sendJson(res, action, status = StatusCodes.OK) {
  let result = await action();


  if (result?.success) {
    return res.status(status).json({
      ...result.result
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: result?.success,
      message: result?.message,
      error: result.error,
      errorCode: result.errorCode
    });
  }
}

module.exports = {
  sendJson
};
