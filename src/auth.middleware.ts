import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

type NextFunc = () => void;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunc) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const validToken = jwt.verify(token, process.env.JWT_SECRET);
        req.headers.user = validToken;
        return next();
    } catch (error) {
      console.log("Errors!!!!!");
      throw new HttpException('Invlid user token', HttpStatus.FORBIDDEN);
    }
  }
}
