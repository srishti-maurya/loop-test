import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [cookies, setCookie] = useCookies();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantList, setSelectedRestaurantList] = useState(
    cookies.restaurant ? cookies.restaurant : []
  );
  const [bookmarkList, setBookMarkList] = useState(
    cookies.bookMark ? cookies.bookMark : []
  );
  const [likedList, setLikedList] = useState(
    cookies.liked ? cookies.liked : []
  );

  const getRestaurantList = () => {
    const host = `https://api.airtable.com/`;
    const token = 'Bearer keyfXgn8PL6pB3x32';

    (async function () {
      try {
        const response = await axios.get(
          `${host}v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=10&view=Grid%20view`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setRestaurants(response.data.records);
      } catch (error) {
        console.error('ERROR', error);
      }
    })();
  };

  return (
    <DataContext.Provider
      value={{
        getRestaurantList,
        restaurants,
        selectedRestaurantList,
        setSelectedRestaurantList,
        bookmarkList,
        setBookMarkList,
        setCookie,
        likedList,
        setLikedList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
