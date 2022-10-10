import React, { useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../contexts/auth-context';
import { food } from '../assets/images';

export const Login = () => {
  const { getUsersList } = useAuth();

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-200 to-orange-300 w-screen h-screen">
      <p className="text-center font-black text-3xl py-24 text-orange-600">
        Sign in to continue
      </p>
      <div className="flex justify-evenly">
        <img src={food} alt="food" className="object-contain img-responsive" />
        <LoginForm />
      </div>
    </div>
  );
};
