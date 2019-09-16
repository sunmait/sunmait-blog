import express = require('express');
import IUserDecodedFromToken from './IUserDecodedFromToken';

export interface IAuthorizedRequest extends express.Request {
  user: IUserDecodedFromToken;
}
