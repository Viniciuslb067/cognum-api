import { Response } from "express";

type TypeSuccessResponseHandler = {
  response: Response;
  extraInfo?: any;
  message?: string;
  statusCode?: number;
};

type TypeErrorResponseHandler = {
  response: Response;
  message?: string;
  statusCode?: number;
};

export const errorResponseHandler = ({
  response,
  message = "Internal server error",
  statusCode = 500,
}: TypeErrorResponseHandler) => {
  response.status(statusCode).json({ type: "error", message });
};

export const successResponseHandler = ({
  response,
  extraInfo,
  message = "Operation successfully completed",
  statusCode = 200,
}: TypeSuccessResponseHandler) => {
  response.status(statusCode).json({ type: "success", message, ...extraInfo });
};
