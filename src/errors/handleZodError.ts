import { ZodError } from 'zod';
import { IGenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError) => {
  const errors: IGenericErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Error',
    errorMessage: errors,
  };
};

export default handleZodError;
