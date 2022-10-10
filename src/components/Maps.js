import React from 'react';
import { useLocation } from 'react-router-dom';

export const Maps = ({
  element,
  addToBookmark,
  removeFromList,
  removeFromBookmark,
  addToLiked,
  removeFromLiked,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col p-8 items-center bg-orange-200 my-2 rounded-md shadow-md">
      <iframe
        title="map"
        width="600"
        height="450"
        src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${element.Name}%22%7D`}
        allowFullScreen
        style={{ border: 0 }}
      ></iframe>
      <div className="flex justify-between items-center mt-4">
        {location.pathname === '/bookmark' ? (
          <>
            <button
              className="bg-orange-400 hover:bg-orange-500 shadow-sm px-6 rounded-md h-10 mx-4 text-orange-100 text-center font-bold"
              onClick={() => removeFromBookmark(element)}
            >
              Remove Bookmark
            </button>
            <button
              className="bg-orange-400 hover:bg-orange-500 shadow-sm px-6 rounded-md h-10 text-orange-100 text-center font-bold"
              onClick={() => addToLiked(element)}
            >
              Like it
            </button>
          </>
        ) : location.pathname === '/liked' ? (
          <button
            className="bg-orange-400 hover:bg-orange-500 shadow-sm px-6 rounded-md h-10 mx-4 text-orange-100 text-center font-bold"
            onClick={() => removeFromLiked(element)}
          >
            Remove Liked
          </button>
        ) : (
          <>
            <button
              className="bg-orange-400 hover:bg-orange-500 shadow-sm px-6 rounded-md h-10 mx-4 text-orange-100 text-center font-bold"
              onClick={() => addToBookmark(element)}
            >
              Bookmark
            </button>

            <button
              className="bg-orange-400 hover:bg-orange-500 shadow-sm px-6 rounded-md h-10 text-orange-100 text-center font-bold"
              onClick={() => removeFromList(element)}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};
