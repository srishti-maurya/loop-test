import React from 'react';
import { pancake } from '../assets/images';
import { Maps } from '../components/Maps';
import { Tabs } from '../components/Tabs';
import { useData } from '../contexts/data-context';
import {
  toast_addedToLike,
  toast_bookmarkRemoved,
  toast_alreadyInList,
} from '../utils/toasts';

export const Bookmark = () => {
  const { bookmarkList, setBookMarkList, setCookie, likedList, setLikedList } =
    useData();

  const addToLiked = (ele) => {
    const matchedItem = likedList.find((element) => element.Name === ele.Name);
    if (!matchedItem) {
      setLikedList((likedList) => [...likedList, ele]);
      setCookie('liked', [...likedList, ele], {
        path: '/',
      });
      toast_addedToLike();
    } else {
      toast_alreadyInList();
    }
  };

  const removeFromBookmark = (ele) => {
    setBookMarkList(bookmarkList.filter((item) => item.Name !== ele.Name));
    toast_bookmarkRemoved();
  };

  return (
    <div>
      <div className="flex p-4  min-h-screen min-w-full bg-gradient-to-r from-orange-200 to-orange-300">
        <Tabs onBookmark />
        <div className="flex flex-col w-5/6 items-center">
          <img
            src={pancake}
            alt="pancake"
            className="object-contain img-responsive h-32 my-10"
          />
          {bookmarkList.length < 1 ? (
            <p className="text-center font-black text-xl mx-4 text-orange-600 my-8 py-2 ">
              No bookmark added
            </p>
          ) : (
            bookmarkList.map((ele) => (
              <Maps
                key={ele.id}
                element={ele}
                removeFromBookmark={removeFromBookmark}
                addToLiked={addToLiked}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
