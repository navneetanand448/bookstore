const fs = require('node:fs');

exports.loggerMiddleware = function loggerMiddleware(req, res, next) {
  // 1. Create the log string
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;

  // 2. Write to file
  // Note: appendFile creates the file if it doesn't exist
  fs.appendFileSync('logs.txt', log, 'utf-8');

  // 3. CRITICAL: Pass control to the next middleware/route
  next();
}