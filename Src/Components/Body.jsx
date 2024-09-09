import { FOODFIRE_API_URL } from "./Utils/Constants";
import ResturantCard from "./RestaurantCard";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "./Utils/Helper";
import ResData from "./Hooks/useResData";
import UserOffline from "./UserOffline";
import useOnline from "./Hooks/useOnline";

const Body = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [allRestaurants, FilterRes] = ResData(FOODFIRE_API_URL);
  const [filteredRestaurants, setfilteredRestaurants] = useState(null);
  const [searchText, setSearchText] = useState("");
  const isOnline = useOnline();

  if (!isOnline) {
    return <UserOffline />;
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setfilteredRestaurants(filteredData);
      if (filteredData?.length == 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setfilteredRestaurants(restaurants);
    }
  };
  if (!allRestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value, allRestaurants);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {allRestaurants.length === 0 && FilterRes?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {(filteredRestaurants === null ? FilterRes : filteredRestaurants).map(
            (restaurant) => {
              return (
                <Link
                  to={"/restaurants/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >
                  <ResturantCard {...restaurant?.info} />{" "}
                </Link>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default Body;