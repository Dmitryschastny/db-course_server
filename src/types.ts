import { Request as ExpressRequest } from 'express';

type DecodedToken = {
  email: string;
  iat: number;
  exp: number;
  iss: string;
};

export interface Request<T> extends ExpressRequest {
  body: T;
}

export interface VerifiedRequest<T> extends Request<T> {
  decoded: DecodedToken;
}
