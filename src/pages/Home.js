import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { pancake } from '../assets/images';
import { Maps } from '../components/Maps';
import { Tabs } from '../components/Tabs';
import { useData } from '../contexts/data-context';
import {
  toast_addedToList,
  toast_bookmarkAdded,
  toast_removedFromList,
  toast_alreadyInList,
} from '../utils/toasts';

export const Home = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const {
    getRestaurantList,
    restaurants,
    selectedRestaurantList,
    setSelectedRestaurantList,
    bookmarkList,
    setBookMarkList,
    setCookie,
  } = useData();

  useEffect(() => {
    getRestaurantList();
  }, []);

  restaurants.map((res, index) => (res.fields.id = index));
  const restaurantList = restaurants.map((res) => res.fields);

  const handleOnSelect = (item) => {
    setSelectedRestaurant(item);
  };

  const addToList = () => {
    setSelectedRestaurantList((selectedRestaurantList) => [
      ...selectedRestaurantList,
      selectedRestaurant,
    ]);
    setCookie('restaurant', [...selectedRestaurantList, selectedRestaurant], {
      path: '/',
    });
    toast_addedToList();
  };

  const removeFromList = (ele) => {
    setSelectedRestaurantList(
      selectedRestaurantList.filter((item) => item.Name !== ele.Name)
    );
    toast_removedFromList();
  };

  const addToBookmark = (ele) => {
    const matchedItem = bookmarkList.find(
      (element) => element.Name === ele.Name
    );
    if (!matchedItem) {
      setBookMarkList((bookmarkList) => [...bookmarkList, ele]);
      setCookie('bookMark', [...bookmarkList, ele], { path: '/' });
      toast_bookmarkAdded();
    } else {
      toast_alreadyInList();
    }
  };

  return (
    <div className="flex p-4  min-h-screen min-w-full bg-gradient-to-r from-orange-200 to-orange-300">
      <Tabs onHome />
      <div className="flex flex-col w-5/6 items-center">
        <img
          src={pancake}
          alt="pancake"
          className="object-contain img-responsive h-32 my-10"
        />
        <div className="mx-4 p-4 flex w-4/5 justify-between items-center">
          <div className="w-5/6">
            <ReactSearchAutocomplete
              items={restaurantList}
              fuseOptions={{ keys: ['Name'] }}
              resultStringKeyName="Name"
              placeholder="Search restaurant..."
              onSelect={handleOnSelect}
              showIcon={false}
              showClear={false}
            />
          </div>
          <button
            className="text-orange-100 text-center font-bold text-xl h-10 bg-orange-500 hover:bg-orange-600 px-10 py-2 rounded-md shadow-md mx-4"
            onClick={addToList}
          >
            Add
          </button>
        </div>
        {selectedRestaurantList.map((ele) => (
          <Maps
            key={ele.id}
            element={ele}
            addToBookmark={addToBookmark}
            removeFromList={removeFromList}
          />
        ))}
      </div>
    </div>
  );
};
