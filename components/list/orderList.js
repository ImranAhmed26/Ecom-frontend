import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { authContext } from "../../context/authContext";
import OrderViewModal from "../modal/orderViewModal";
import { formatDate } from "../../lib/helper";
import { GET } from "../../lib/api";
import Loader from "../common/loader";

const OrderList = () => {
  const [data, setData] = useState();
  const [order, setOrder] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const { state } = useContext(authContext);

  const handleOpenCard = () => {
    setVisible(true);
  };

  useEffect(() => {
    GET(`${state.user?.type === "admin" ? "/orders" : "/orders/myorders"}`).then(
      ({ data, status }) => {
        if (status !== 200) {
          console.log(data);
          console.log(status);
          setLoading(false);
        } else if (status === 200) {
          console.log("Login success");
          console.log(data);
          setData(data);
          setLoading(false);
        }
      },
    );
    setShouldUpdate(false);
  }, [shouldUpdate]);

  return (
    <div className="lg:px-6 pb-4 mx-2 min-h-[600px]  h-full w-full">
      <div className="flex justify-between w-full pr-2">
        <div className="text-2xl font-bold font-sans cursor-default py-1 mb-2">Orders</div>
      </div>
      <div className="relative">
        <div className="absolute w-full">{isLoading && <Loader />}</div>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead>
            <tr className="w-full bg-gray-700 rounded-md px-2 py-10 text-gray-100">
              <th className="py-2">Date</th>
              <th>Order Number </th>
              <th className="py-2">Total Ordered Items</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="w-full px-6 py-2 text-center hover:bg-slate-200 transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    handleOpenCard();
                    setOrder(item);
                  }}
                >
                  <td className="py-2">{formatDate(item.createdAt)}</td>
                  <td>{item?.orderNumber}</td>
                  <td className="py-2">{item.items.length}</td>
                  {state.user?.type === "admin" ? (
                    <td>
                      {item.isDelivered ? (
                        <span className="text-green-500 font-bold">Delivered</span>
                      ) : (
                        <span className="text-rose-400 font-medium">Order Pending</span>
                      )}
                    </td>
                  ) : (
                    <td>
                      {item.isDelivered == true ? (
                        <span className="text-green-500 font-bold">Delivered</span>
                      ) : (
                        <span className="text-violet-800 font-semibold">Order Placed</span>
                      )}
                    </td>
                  )}
                  <td>
                    <Image
                      src={item.items[0].product?.photo[0]?.url}
                      width={30}
                      height={30}
                      alt={"img"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <OrderViewModal
        visible={visible}
        setVisible={setVisible}
        order={order}
        setShouldUpdate={setShouldUpdate}
      />
    </div>
  );
};

export default OrderList;
