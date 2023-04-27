import React, { useEffect, useState } from "react";

import { GET } from "../../lib/api";
import ProductCard from "../card/productCard";
import Pagination from "../common/pagination";
import ProductViewModal from "../modal/productViewModal";

const ProductGrid = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [product, setProduct] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let query = { limit: 12, page: page };

    GET("/products", query).then(({ data, status }) => {
      if (status !== 200) {
        console.log("status: ", status);
      } else if (status === 200) {
        console.log("status:", status);
        setData(data.data);
        setPages(data.pages);
      }
    });
  }, [page]);

  const handleOpenCard = () => {
    setVisible(true);
  };

  return (
    <div className=" px-1=0 py- mx-2  w-screen h-full ">
      <div className="text-2xl font-bold font-sans cursor-default">Shop</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-content-center w-full gap-y-6 gap-x-6 py-4">
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              className="max-w-[300px]"
              onClick={() => {
                handleOpenCard();
                setProduct(item);
              }}
            >
              <ProductCard image={item.photo[0]?.url} title={item.name} quantity={item.quantity} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center p-5">
        <Pagination page={page} setPage={setPage} pages={pages} />
      </div>
      <ProductViewModal product={product} visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ProductGrid;
