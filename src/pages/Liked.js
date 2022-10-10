import React from 'react';
import { pancake } from '../assets/images';
import { Maps } from '../components/Maps';
import { Tabs } from '../components/Tabs';
import { useData } from '../contexts/data-context';
import { toast_removedFromLike } from '../utils/toasts';

export const Liked = () => {
  const { likedList, setLikedList } = useData();

  const removeFromLiked = (ele) => {
    setLikedList(likedList.filter((item) => item.Name !== ele.Name));
    toast_removedFromLike();
  };

  return (
    <div>
      <div className="flex p-4  min-h-screen min-w-full bg-gradient-to-r from-orange-200 to-orange-300">
        <Tabs onLiked />
        <div className="flex flex-col w-5/6 items-center">
          <img
            src={pancake}
            alt="pancake"
            className="object-contain img-responsive h-32 my-10"
          />
          {likedList.length < 1 ? (
            <p className="text-center font-black text-xl mx-4 text-orange-600 my-8 py-2 ">
              No liked restaurants
            </p>
          ) : (
            likedList.map((ele) => (
              <Maps
                key={ele.id}
                element={ele}
                removeFromLiked={removeFromLiked}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
