declare namespace Express {
  interface Request {
    body: {
      uid: string;
      _id: string;
    };
  }
}
