import { ZodError, ZodSchema } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValidationMiddleware = function (schema: ZodSchema<any>, data: any) {
  return function () {
    try {
      const validatedData = schema.parse(data);
      return validatedData;
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.issues.map((err) =>
          Object.assign(
            {},
            {
              path: err.path[1],
              message: err.message,
            }
          )
        );

        throw new Error(
          `${String(errors[0].path || "")} ${errors[0].message.toLocaleLowerCase()}`
        );
      } else {
        throw new Error("Invalid request data");
      }
    }
  };
};

export default ValidationMiddleware;
