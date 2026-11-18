/**
 * Centralized Error Handling Middleware
 * 
 * Captures all unhandled errors thrown during request processing,
 * formats them consistently, and returns standard HTTP error responses.
 */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Handle JSON syntax parsing errors from body-parser / express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload received in request body.'
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorHandler;
