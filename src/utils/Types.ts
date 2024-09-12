export type ResponseGenerator = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  response?: any;
  status?: number;
  statusText?: string;
  body?: any;
};

export type Tokens = {
  accesToken: string;
  refreshToken: string;
} | undefined;

export type TokenType = {
  _id: string,
  iat: number,
  exp: number
}