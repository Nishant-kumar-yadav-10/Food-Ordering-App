import React from "react";

const UserOffline = () => {
  return (
    <div className="user-offline-container">
      <h1 className="user-offline-heading">🔴 Offline!</h1>
      <img
        className="offline-image"
        src="https://thumbs.dreamstime.com/z/offline-red-retro-vintage-rubber-stamp-isolated-white-background-offline-red-vintage-rubber-stamp-isolated-white-background-109373377.jpg?w=768"
        alt="Offline"
      />
      <p className="user-offline-message">
        Sorry, it seems that you are currently offline.
      </p>
    </div>
  );
};

export default UserOffline;