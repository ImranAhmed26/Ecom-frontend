import React, { useEffect, useState } from "react";

import { GET } from "../../lib/api";
import ProductCard from "../card/productCard";
import Pagination from "../common/pagination";
import ProductViewModal from "../modal/productViewModal";
import Loader from "../common/loader";

const ProductGrid = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [product, setProduct] = useState({});
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let query = { limit: 12, page: page };

    GET("/products", query).then(({ data, status }) => {
      if (status !== 200) {
        console.log("status: ", status);
        setLoading(false);
      } else if (status === 200) {
        console.log("status:", status);
        setData(data.data);
        setPages(data.pages);
        setLoading(false);
      }
    });
  }, [page]);

  const handleOpenCard = () => {
    setVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center px-10 py- mx-2  w-screen h-full ">
      <div className="text-2xl font-bold font-sans cursor-default">Shop</div>
      <div className="w-full">{isLoading && <Loader />}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center w-full gap-y-6 gap-x-6 py-4 max-w-[1300px]">
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
