import React from 'react';
import { Link } from 'react-router-dom';
import { burger, coffee } from '../assets/images';
import { useAuth } from '../contexts/auth-context';

export const Tabs = ({ onHome, onBookmark, onLiked }) => {
  const { logoutHandler } = useAuth();

  return (
    <div className="flex flex-col p-4 bg-orange-100 rounded-md shadow-md">
      <Link
        to="/home"
        className={`text-center font-black text-xl mx-4 text-orange-600 my-8 py-2 px-8 hover:bg-orange-200 hover:rounded-md hover:shadow-md ${
          onHome ? 'bg-orange-200 rounded-md shadow-md' : ''
        }`}
      >
        Home
      </Link>
      <Link
        to="/bookmark"
        className={`text-center font-black text-xl mx-4 text-orange-600 py-2 px-8 hover:bg-orange-200 hover:rounded-md  hover:shadow-md
        ${onBookmark ? 'bg-orange-200 rounded-md shadow-md' : ''}
        `}
      >
        Bookmark
      </Link>
      <Link
        to="/liked"
        className={`text-center font-black text-xl mx-4 text-orange-600 my-8 py-2 px-8 hover:bg-orange-200 hover:rounded-md hover:shadow-md ${
          onLiked ? 'bg-orange-200 rounded-md shadow-md' : ''
        }`}
      >
        Liked
      </Link>
      <img
        src={burger}
        alt="burger"
        className="object-contain img-responsive h-32 my-8"
      />
      <img
        src={coffee}
        alt="coffee"
        className="object-contain img-responsive h-32 my-8"
      />
      <p onClick={logoutHandler}>
        <Link
          className={`text-center font-black text-xl mx-4 text-orange-600 my-8 py-2 px-8 hover:bg-orange-200 hover:rounded-md hover:shadow-md `}
        >
          Log Out
        </Link>
      </p>
    </div>
  );
};
