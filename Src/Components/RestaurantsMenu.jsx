import { useParams } from "react-router-dom";
import {
  FOODFIRE_MENU_API_URL,
  IMG_CDN_URL,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY,
  ITEM_IMG_CDN_URL,
} from "./Utils/Constants";
import { MenuShimmer } from "./Shimmer";
import useResMenuData from "./Hooks/useResMenuData";
import useOnline from "./Hooks/useOnline";
import UserOffline from "./UserOffline";
const RestaurantsMenu = () => {
  const { resId } = useParams();
  const isOnline = useOnline();
  const [restaurants, menuItems] = useResMenuData(
    FOODFIRE_MENU_API_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  if (!isOnline) {
    return <UserOffline />;
  }

  return !restaurants ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurants?.cloudinaryImageId}
          alt={restaurants?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurants?.name}</h2>
          <p className="restaurant-tags">{restaurants?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                restaurants?.avgRating < 4
                  ? { backgroundColor: "var(--light-red)" }
                  : restaurants?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span>{restaurants?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurants?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurants?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantsMenu;