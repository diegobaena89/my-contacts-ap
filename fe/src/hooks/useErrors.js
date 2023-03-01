/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { useState, useCallback } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(
    ({ field, message }) => {
      const errorAlreadyExists = errors.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((fieldName) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName)
    );
  }, []);

  const getMessageByFieldName = useCallback(
    (fieldName) => {
      errors.find((error) => error.field === fieldName)?.message;
    },
    [errors]
  );

  return {
    errors,
    setError,
    removeError,
    getMessageByFieldName,
  };
}
