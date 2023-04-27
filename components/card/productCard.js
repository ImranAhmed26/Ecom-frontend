import Image from "next/image";
import React from "react";

const ProductCard = ({ image, title, details, quantity }) => {
  return (
    <div>
      <div className="bg-white rounded-md shadow hover:scale-[1.04] transition-all duration-300 group cursor-pointer">
        <div className="text-center h-full rounded-md ">
          <div className="w-full h-[75%] rounded-md ">
            <Image
              src={image}
              className="rounded-t-md"
              height={300}
              width={300}
              alt="product image"
            />
          </div>
          <div className="text-left px-4 py-4 flex flex-col gap-1 ">
            <div className="text-lg font-bold h-6 overflow-clip">{title}</div>
            <div className="">
              <span className="text-base ">Available quantity: </span>
              {`${quantity}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
