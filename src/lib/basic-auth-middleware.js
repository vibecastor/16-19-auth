'use strict';

import HttpError from 'http-errors';
import Account from '../model/account';

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH __ERROR__ authorization header required'));
  }
  // if I'm here, I know I have the header
  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) {
    return next(new HttpError(400, 'AUTH __ERROR__ basic authorization required'));
  }

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  // at this point stringAuthHeader looks like username:password
  // destructuring an array below...ES6 cool feature!
  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) {
    return next(new HttpError(400, 'AUTH - __ERROR__ username and password required'));
  }

  // we know we have a username and password now...
  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        throw new HttpError(404, 'AUTH ERROR not found');
      }
      return account.pVerifyPassword(password); // Todo:  where does this live???
    })
    .then((account) => {
      request.account = account;
      return next(); // this calls the next function in the middleware chain.
    })
    .catch(next);
};
