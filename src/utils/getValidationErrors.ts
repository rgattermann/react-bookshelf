import { ValidationError} from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {

  const myValidationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path) {
      myValidationErrors[error.path] = error.message;
    }
  });

  return myValidationErrors;
}
