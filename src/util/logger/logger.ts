import { Logger } from "winston";
import { devLogger } from "./dev-logger";
import { prodLogger } from "./prod-logger";

let logger: Logger | null = null;

if (process.env.NODE_ENV === "development") logger = devLogger();
else logger = prodLogger();

export { logger };
