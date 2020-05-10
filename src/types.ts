import { Request } from 'express';

type DecodedToken = {
  email: string;
  iat: number;
  exp: number;
  iss: string;
};

export interface VerifiedRequest extends Request {
  decoded: DecodedToken;
}
