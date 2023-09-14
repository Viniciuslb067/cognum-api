export type TypeBaseError = {
  name: string;
  description: string;
  statusCode?: number;
};

export default class BaseError extends Error {
  public readonly statusCode?: number;
  public readonly isOperational?: boolean;

  constructor(name: string, statusCode?: number, description?: string) {
    super(description);

    this.name = name;

    if (statusCode) this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}
