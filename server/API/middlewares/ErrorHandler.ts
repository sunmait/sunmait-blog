import express = require('express');

import IErrorAPIWithMessage from '../helper/IErrorAPIWithMessage';

function ErrorHandler(
  err: IErrorAPIWithMessage,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  const code = err.status || 500;

  if (err.hasOwnProperty('message')) {
    res.statusCode = code;
    res.statusMessage = err.message;
  }

  console.error(err);

  res.status(code);
  res.end();
}

export default ErrorHandler;
