import express, { Request, RequestHandler, Response } from "express";

import { errorResponseHandler, successResponseHandler } from "../util";

import EmployeeService from "../services/employee-service";

const router = express.Router();

const userService = new EmployeeService();

router.get("/hello", (_, response: Response) => {
  successResponseHandler({
    response,
    message: "Hello, Cognum!",
  });
});

router.get("/populate", (async (_, response: Response) => {
  try {
    const employees = await userService.populate();
    successResponseHandler({ response, extraInfo: { employees } });
  } catch (error: any) {
    errorResponseHandler({ response, message: error.message });
  }
}) as RequestHandler);

router.get("/employee/:id", (async (request: Request, response: Response) => {
  try {
    const employee = await userService.getById(request.params.id);
    successResponseHandler({ response, extraInfo: { employee } });
  } catch (error) {
    errorResponseHandler({ response });
  }
}) as RequestHandler);

router.get("/employee", (async (_, response: Response) => {
  try {
    const employees = await userService.list();
    successResponseHandler({ response, extraInfo: { employees } });
  } catch (error) {
    errorResponseHandler({ response });
  }
}) as RequestHandler);

router.post("/employee", (async (request: Request, response: Response) => {
  try {
    const employee = await userService.create(request.body);
    successResponseHandler({
      response,
      statusCode: 201,
      extraInfo: { employee },
    });
  } catch (error) {
    errorResponseHandler({ response });
  }
}) as RequestHandler);

router.patch("/employee/:id", (async (request: Request, response: Response) => {
  try {
    const employee = await userService.update(request.params.id, request.body);
    successResponseHandler({ response, extraInfo: { employee } });
  } catch (error: any) {
    errorResponseHandler({ response, message: error.message });
  }
}) as RequestHandler);

router.delete("/employee/:id", (async (
  request: Request,
  response: Response
) => {
  try {
    await userService.delete(request.params.id);

    successResponseHandler({ response });
  } catch (error) {
    errorResponseHandler({ response });
  }
}) as RequestHandler);

export default router;
