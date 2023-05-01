import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { authContext } from "../../context/authContext";
import ProductEditModal from "../modal/productEditModal";
import ProductAddModal from "../modal/productAddModal";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { GET } from "../../lib/api";

const ProductList = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { state } = useContext(authContext);

  const handleOpenCard = () => {
    setVisible(true);
  };
  const showProductAddModal = () => {
    setVisible2(true);
  };
  let query = { limit: 8, page: page };
  useEffect(() => {
    GET(`/products/${state.user?.type === "admin" ? "" : "myproducts"}`, query).then(
      ({ data, status }) => {
        if (status !== 200) {
          console.log(data);
          console.log(status);
          setLoading(false);
        } else if (status === 200) {
          console.log(data.data);
          setData(data.data);
          setPages(data.pages);
          setLoading(false);
        }
      },
    );
  }, [page]);

  return (
    <div className="lg:px-6 pb-4 mx-2  h-[700px] w-full">
      <div className="flex justify-between w-full pr-2">
        <div className="text-2xl font-bold font-sans cursor-default pb-">Products</div>
        <div
          className="text-2xl  font-sans px-2 py-1 mb-2 bg-slate-600 hover:bg-slate-700 rounded-md cursor-pointer transition-all duration-150 text-gray-100"
          onClick={() => {
            showProductAddModal();
          }}
        >
          Add Products
        </div>
      </div>
      <div className="relative capitalize h-[650px] overflow-y-scroll px-">
        <div className="absolute w-full">{isLoading && <Loader />}</div>
        <table className="min-w-full divide-y-2 divide-gray-200 rounded-md">
          <thead>
            <tr className="w-full bg-gray-700 rounded-md px-2 py-10 text-gray-100">
              <th className="py-2">Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`w-full px-6 py-2 text-center hover:bg-slate-300 transition-all duration-150 cursor-pointer
                   `}
                  onClick={() => {
                    handleOpenCard();
                    setProduct(item);
                  }}
                >
                  <td className="py-2">{item.name}</td>
                  <td className="overflow-clip">
                    {`${item.description.split(" ").slice(0, 3).join(" ")} ...`}
                  </td>
                  <td>{item.category}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Image src={item.photo[0]?.url} width={30} height={30} alt={"img"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <Pagination page={page} setPage={setPage} pages={pages} />
        </div>
      </div>
      <ProductAddModal visible={visible2} setVisible={setVisible2} />
      <ProductEditModal visible={visible} setVisible={setVisible} product={product} />
    </div>
  );
};

export default ProductList;
