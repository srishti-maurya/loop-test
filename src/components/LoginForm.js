import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';

export const LoginForm = () => {
  const { loginHandler, formValues, setFormValues } = useAuth();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = 'Cannot be blank';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be more than 3 characters';
    }

    if (!values.password) {
      errors.password = 'Cannot be blank';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      loginHandler();
    }
  }, [formErrors]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col p-4 bg-orange-100 rounded-md shadow-md w-2/5"
    >
      <label
        className="font-semibold text-base capitalize mb-1 text-orange-600"
        htmlFor="username"
      >
        username
      </label>
      <input
        type="username"
        name="username"
        id="username"
        placeholder="Enter username..."
        className="py-2 rounded-md text-orange-600 px-4 mb-3"
        value={formValues.username}
        onChange={handleChange}
      />
      {formErrors.username && (
        <span className="italic text-xs text-red-500 py-1">
          {formErrors.username}
        </span>
      )}
      <label
        className="font-semibold text-base capitalize mb-1 text-orange-600"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="Enter password..."
        className="py-2 rounded-md text-orange-600 px-4"
        autoComplete="new-password"
      />
      {formErrors.password && (
        <span className="italic text-xs text-red-500 py-1">
          {formErrors.password}
        </span>
      )}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-orange-100 font-bold rounded-md m-auto h-9 my-4"
      >
        Sign In
      </button>
    </form>
  );
};
