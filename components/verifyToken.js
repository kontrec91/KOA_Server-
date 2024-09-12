import jwt from "jsonwebtoken";
import 'dotenv/config';

export const verifyToken = async (ctx, next) => {
  const { SECRET_KEY } = process.env;
  if(!ctx.header.authorization) {
    ctx.status = 403;
    ctx.body = 'Something went wrong';
  }
  const token = ctx.header.authorization.split(' ')[1];
  try {
    jwt.verify(token, `${process.env.ACCESS_KEY}`);
    ctx.response.status = 200;
  } 
  catch(e) {
    console.log('Token expired!!!!!!!!!!!!!!');
    ctx.response.status = 401;
    ctx.body = 'Token expired';
  }
  await next();
};
