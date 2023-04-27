import React from "react";

const DisplayCard = ({ item }) => {
  return (
    <div>
      <div className="border bg-gray-50 w-full px-8 py-4 mx-4 capitalize">
        {
          <div key={item._id}>
            <div>{item.name}</div>
            <div>{item.details}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default DisplayCard;
