import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new Error(
          result.error.issues.map(err => err.message).join(", ")
        )
      );
    }

    req.body = result.data;
    next();
  };
