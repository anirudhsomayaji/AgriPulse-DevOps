/**
 * 404 Not Found Middleware
 * 
 * Intercepts requests targeting unmapped routes and returns a structured JSON 404 response.
 */

function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
}

module.exports = notFound;
